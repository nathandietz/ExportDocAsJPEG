﻿/**********************************************************

Nathan Dietz
Version: 0.7

This script saves each artboard in the active Illustrator document
as a 300dpi CMYK JPEG in the ' Presentations/ jpegs' folder

This script was (modified from pieces I found on the adobe forums).

*********************************************************/

/*#################################
############ Variables ############
#################################*/

      // Illustrator action variables
var   imagQual, compMeth, numScans, aliasing, imageRes, colorMdl, imageMap, mapStyle, iccProfl, illustratorAction,
      
      // File & folder variables
      presentationFolder, regexPresFolder, jpegsFolder ,regexJPEGFolder, destFolder,

      // Script variables
      scriptVersion;

// Image Quality
imagQual = "06000000"; /*  Range: 0-10
                          01000000 = Low
                          03000000 = Medium
                          06000000 = High
                          08000000 = Maximum
                      */
// Compression Method
compMeth = "01000000"; /*  Range: 1-3
                          01000000 = Baseline (Standard)
                          02000000 = Baseline Optimzied
                          03000000 = Progressive 
                      */
// Number of Scans
numScans = "03000000"; /*  Range: 3-5
                          03000000 = 3 Scans
                          04000000 = 4 Scans
                          05000000 = 5 Scans

                          This is only applicable when using Progressive compression "03000000"
                      */
// Anti-aliasing
aliasing = "02000000" /*  Range: 1-3
                          01000000 = None
                          02000000 = Art Optimzied  (Supersampling)
                          03000000 = Type Optimzied (Hinted)
                      */                               
// Image Resolution
imageRes = "00002c01" /*  00004800 = Screen (72 dpi)
                          00009600 = Medium (150 dpi)
                          00002c01 = High   (300 dpi)
                          00005802 = Max    (600 dpi)
                      */
// Color Model
colorMdl = "02000000"; /*  Range: 1-3
                          01000000 = RGB
                          02000000 = CMYK
                          03000000 = Grayscale 
                      */                                
// Image Map
imageMap = "02000000"; /*  Range: 2-3
                          02000000 = Disabled
                          03000000 = Enabled 
                      */ 
// Image Map Style
mapStyle = "02000000"; /*  Range: 1-2
                          01000000 = Client (.html)
                          02000000 = Server (.map)
                      */                                             
// ICC Profile
iccProfl = "00000100"; /*  Range: 0-1
                          00000000 = Do not embed ICC Profile
                          00000100 = Embed ICC Profile
                      */


var errMsg_cannotFindFolder = "folder not found\n" +                       
                              "1. Make sure you are connected to the server.\n" +
                              "2. Make sure you are using correct folder struture.\n\n" +
                              "This script will now exit."
                              
/********************************************************
Main Code [Execution of script begins here]
*********************************************************/

#target illustrator

// Suppress Illustrator warning dialogs (aka automaticlly overwrite files)
app.userInteractionLevel = UserInteractionLevel.DONTDISPLAYALERTS;

main();


function main() {
  try {
    
    // Illustrator has a document open
    if (app.documents.length > 0) {
        
        // Get folder to save the files into
        var destFolder = null;
        
        
        //destFolder = Folder.selectDialog( 'Select folder for JPEG files.', '~' ); // Uncomment for custom location for file save
        destFolder = getJPEGFolder();
       
        // Generates full path name
        targetFile = destFolder.fsName + "/" + baseName(app.activeDocument.name) + ".jpg";
        
        // Writes jpeg file to disk
        exportJpegTo(targetFile);
        
    } else {
        throw new Error("Error: There is no Document open.\nOpen a file and then re-run this script.");
    }

  } catch (e) {
    alert(e.message, "Script Alert", true);
  } 
}



/*#################################
######## Personal Functions #######
#################################*/

/** Locates the folder where to save the JPEG
    @return destFolder  a single Folder path object
    
    This function isolates the logic to find the presentaion folder and jpeg folder
    so the main() function can easily switch between the Folder.selectDialog() and
    this function.
 */
function getJPEGFolder() {
  var presFolder, jpegFolder;
 
  presFolder = locateFolder("Presentations", app.activeDocument.path,  2);
  
  if (presFolder != null) {
    return jpegFolder = locateFolder("jpegs", presFolder,  0);
  } else {
    throw new Error("Error: " + errMsg_cannotFindFolder);
  }
}


/** Locates a specified folder by walking folder hierarchy
    @param  folderName    the name of the folder
    @param  folderPath    the path to start the search
    @param  folderLevel   the number of times to move up a folder level and research
    @return destFolder    a single Folder path object
 */
function locateFolder(folderName, folderPath, folderLevel) {    
    // Need to make sure folder name matches even if there is extra
    // white space in front, folder name is pural, and iconsistance case
    var folderNameRegex = new RegExp('\s?' + folderName + '?', 'i');
    
    /*** Version 2: Faster (I think) ***/
    // Using a regular expression to match folder name
    // var destFolder = Folder(folderPath.getFiles(folderNameRegex));
    var destFolder = folderPath.getFiles(folderNameRegex);
    
    // Single result. Continue
    if (destFolder.length == 1) {
        destFolder = Folder(destFolder);
        return destFolder;
      
    // No result. 
    } else if (destFolder.length == 0) {
      
      if (folderLevel > 0) {
        // Check parent directory
        return locateFolder(folderName, folderPath.parent, folderLevel-1);
      
      // No result. Throw error
      } else {
         throw new Error("Error: \"" + folderName + "\" " + errMsg_cannotFindFolder);
     }
                      
    // Mutliple results. Throw error
    } else if (destFolder.length > 1) {
      throw new Error("Error: Multiple results found\n" +
                      "There are " + destFolder.length + "\b items named \"" + folderName + "\" in \n" 
                      + folderPath.parent.fsName + "/ \n\n" +
                      "This script will now exit."); 
    } else {
      throw new Error("Error: Something weird happened")
    }
    


    /*** Version 1: Slower and more error prone ***/
    /*
    // Using a function to match folder and name 
    // getFiles() accepts a function as a mask instead of a string
    // and this allows us to return only folders and if that match a specific name
    var destFolder = Folder(folderPath.getFiles(
        // this is the mask for getFiles();
        function(f) {
            // Check if 'f' is a folder and it matches the folderName
            if (f instanceof Folder && f.name.match(folderNameRegex)) {return true;}            
        }
    ));
    
    // Found the folder, return path
    if (destFolder.exists) {
        return destFolder;
    // Did not find folder in current directory
    } else if (folderLevel > 0) {
        // Move up to parent and try again (recursive)
        return locateFolder(folderName, folderPath.parent, folderLevel-1); 
    } else {
        // Could not find folder, throw error
        throw new Error("Error: \"" + folderName + "\" folder not found\n" +                       
                         "1. Make sure you are connected to the server.\n" +
                         "2. Make sure you are using correct folder struture.\n\n" +
                         "This script will now exit.");
    }*/  
}




/** Generates the Illustrator action
    @param  xxxxxxxxxx    xxxxxxx
 */

function generateIllustratorAction(imagQual, compMeth, numScans, aliasing, imageRes, colorMdl, mapStyle, mapStyle, iccProfl, destFolder){
  
  var str = "";
  for (var i=0;i<destFolder.length;i++) str += u16to8(destFolder.charCodeAt(i));
  
  var illustratorAction = ''  +
  '/version 3'                +
  '/name [ 4 '                + // Defines "Set" name in the Illustrator actions panel: '4' = number_of_characters in string below
      '73657431'              + // '73657431' = hex_encoded_name ('set1') 
  ']'                         + 
  '/isOpen        0'          + 
  '/actionCount   1'          + // Defines the number of actions in the "Set" 
  '/action-1 {'               + 

    /** Defines "Action" name in the Illustrator actions panel **/
    '/name [ 4 '              + // '4'          = number_of_characters
      '61637431'              + // '61637431'   = hex_encoded_name ('act1')
    ']'                       + 

    '/keyIndex    1'          +
    '/colorIndex  0'          +
    '/isOpen      1'          +
    '/eventCount  1'          +


    '/event-1 {'              +
      '/useRulersIn1stQuadrant 0'             +

      '/internalName (adobe_exportDocument)'  +
      '/localizedName [ 9 '   + 
        '4578706f7274204173'  + // = 'Export As'
      ']'                     +

      '/isOpen          0'    +
      '/isOn            1'    +
      '/hasDialog       1'    +
      '/showDialog      0'    +

      '/parameterCount  7'    +
      /** Defines Export settings. See variables section **/
      '/parameter-1 {'        +
        '/key 1885434477'     +   // Unknown: �CDw
        '/showInPalette 0'    +   // Unknown
        '/type (raw)'         +   // Unknown
        '/value < 100 '       +   // Unknown
           imagQual + compMeth + numScans + aliasing + imageRes + colorMdl + mapStyle + mapStyle   +
          "69006d00   61006700   65006d00   61007000   00000000   00000000   00000000   00000000"  +
          "00000000   00000000   00000000   00000000   00000000   00000000   00000000   00000000"  +
           iccProfl           +
        '>'                   +
        '/size 100'           +   // Unknown 
      '}'                     + 

      /** Defines file path for export **/
      '/parameter-2 {'        +
        '/key 1851878757'     +
        '/showInPalette 4294967295'       + // ID for 'Export As' window
        '/type (ustring)'                 +
        '/value [ ' + str.length/2 + // Dynamically generated number_of_characters  
           ' ' + str               + // Dynamically generated file path 
        ']'                   +
      '}'                     +

      /** Defines: Image Format **/
      '/parameter-3 {'                        +
        '/key 1718775156'                     +   // wQV
        '/showInPalette 4294967295'           +   // ID for 'Export As' window
        '/type (ustring)'                     +
        '/value [ 16 '                        + 
          '4a5045472066696c6520666f726d6174'  +   // 'JPEG file format'
        ']'                                   +
      '}'                                     +

      /** Defines: Images Extension Type **/
      '/parameter-4 {'                  +
        '/key 1702392942'               +   // 9)B
        '/showInPalette 4294967295'     +   // ID for 'Export As' window
        '/type (ustring)'               +
          '/value [ 12 '                +
            '6a70672c6a70652c6a706567'  +   // jpg,jpe,jpeg
          ']'                           +
        '}'                             +
  
      /** Defines: 'Use Artboards' Checkbox **/
      '/parameter-5 {'                  +
        '/key 1936548194'               +   // 6T��
        '/showInPalette 4294967295'     +   // ID for 'Export As' window
        '/type (boolean)'               +
        '/value 1'                      +   // 1 = checked, 0 = unchecked | If '0' is set (unchecked) then parameter-6 & parameter-7 are ignored
      '}'                               +

      /** Defines: All or Range Radio Button **/
      '/parameter-6 {'                  +
        '/key 1935764588'               +   // 5vE�
        '/showInPalette 4294967295'     +   // ID for 'Export As' window
        '/type (boolean)'               +
        '/value 0'                      +   // 1 = All, 0 = Range | If '1' is set then parameter-7 is ignored
      '}'                               +

      /** Defines: Range of Artbords to Export */
      '/parameter-7 {'                  +
        '/key 1936875886'               +
        '/showInPalette 4294967295'     +
        '/type (ustring)'               +
        '/value [ 0]'                   +   // [ 0] = All, [ 1 31] = Artboard #1 , [ 1 32] = Artboard #2, et cetera
      '}'                               +

    '}'                                 +
  '}';
  
  return illustratorAction;
}

function exportJpegTo(exportPath){ 
  
  var illustratorAction = generateIllustratorAction(imagQual, compMeth, numScans, aliasing, imageRes, colorMdl, mapStyle, mapStyle, iccProfl, exportPath);
  
  var tmp = File(Folder.desktop + "/.Export 300dpi CMYK JPG v" + scriptVersion + " Action.aia");

  tmp.open("w");
  tmp.write(illustratorAction);
  tmp.close();
  app.loadAction(tmp);
  app.doScript("act1", "set1", false);
  app.unloadAction("set1","");
  tmp.remove();
  
}

function u16to8(cd) {
  var out =
  (cd < 0x80
  ? toHex2(cd)
  : (cd < 0x800
  ? toHex2(cd >> 6 & 0x1f | 0xc0)
  : toHex2(cd >> 12 | 0xe0) +
  toHex2(cd >> 6 & 0x3f | 0x80)
  ) + toHex2(cd & 0x3f | 0x80)
  );
  return out;
}
 

function toHex2(num) { // Convert Hexidecimal
  var out = "0" + num.toString(16);
  return out.slice(-2);
}

function baseName(str) { // Remove file extension
   var base = str.substring(str.lastIndexOf("/") + 1);
    if(base.lastIndexOf(".") != -1) {
        base = base.substring(0, base.lastIndexOf("."));
     }
   return base;
}