/**********************************************************

Nathan Dietz
Version: 0.7

This script saves each artboard in the active Illustrator document
as a 300dpi CMYK JPEG in the ' Presentations/ jpegs' folder

It was originally found on the adobe forums. Thanks to Silly-V and all the others on the forums.
https://community.adobe.com/t5/illustrator/creating-a-dynamic-action-to-use-with-app-doscript-method/td-p/8918373

*********************************************************/

/*#################################
############ Variables ############
#################################*/
      
var scriptVersion = 0.7;

var errMsg_cannotFindFolder = "folder not found\n" +                       
                              "1. Make sure you are connected to the server.\n" +
                              "2. Make sure you are using correct folder struture.\n\n" +
                              "This script will now exit."
                              
                              
/********************************************************
Main Code [Execution of script begins here]
*********************************************************/

#target illustrator

// This will suppress the warning dialog and run the script 
app.preferences.setBooleanPreference("ShowExternalJSXWarning", false);

// Uncomment line below to suppress Illustrator warning dialogs (aka Dont prompt for file overwrite. Just do it automatically)
//app.userInteractionLevel = UserInteractionLevel.DONTDISPLAYALERTS;

try {
  
  // Illustrator has a document open
  if (app.documents.length > 0) {
      
      // Get folder to save the files into
      var destFolder = null;
      
      
      //destFolder = Folder.selectDialog( 'Select folder for JPEG files.', '~' ); // Always prompt for a save locatioon
      destFolder = getJPEGFolder(); // Export location based on saved file location
     
      // Generates full path name
      targetFile = destFolder.fsName + "/" + baseName(app.activeDocument.name) + ".jpg";
      
      // Writes jpeg file to disk
      exportJPEG(targetFile);
      
  } else {
      throw new Error("Error: There is no Document open.\nOpen a file and then re-run this script.");
  }

} catch (e) {
  alert(e.message, "Script Alert", true);
}


/*#################################
########## Core Functions #########
#################################*/

/** Saves temporary action to disk and has Illustrator run it.
    @param  savePath  The file object to save to
    
 */
function exportJPEG(savePath){ 
  
  // Generate temporary Illustrator Action 
  var illustratorAction = generateIllustratorAction(
    '06000000', // imagQual
    '01000000', // compMeth
    '03000000', // numScans
    '02000000', // aliasing
    '00002c01', // imageRes
    '02000000', // colorMdl
    '02000000', // imageMap
    '02000000', // mapStyle
    '00000100', // iccProfl
     savePath
  );
  
  // Create temporary .aia file and save to disk
  var tmp = File(Folder.desktop + "/.ExportDocAsJPEG.aia");
  if (tmp.open("w")) {
    tmp.write(illustratorAction);
    tmp.close();
  } else {
      throw new Error('Error: Access is denied');
  }
  
  // Load temporary action into Illustrator
  app.loadAction(tmp);
  
  // Have Illustrator run action
  app.doScript("act1", "set1", false);
  
  // Have Illustrator remove action
  app.unloadAction("set1","");
  
  // Delete temporary .aia file
  tmp.remove();
}

/** Generates Illustrator action 
    @param  imagQual  Image Quality
    @param  compMeth  Compression Method
    @param  numScans  Number of scans (when using progressive compression)
    @param  aliasing  Anti-aliasing
    @param  imageRes  Image Resolution
    @param  colorMdl  Color Model
    @param  imageMap  Imagemap
    @param  mapStyle  Imagemap style
    @param  iccProfl  Embed ICC Profile
    @param  savePath  File path to save the JPEG
 */
function generateIllustratorAction(imagQual, compMeth, numScans, aliasing, imageRes, colorMdl, imageMap, mapStyle, iccProfl, savePath) {
  
  var str = "";
  for (var i=0;i<savePath.length;i++) str += u16to8(savePath.charCodeAt(i));
  
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
