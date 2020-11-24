# A breakdown of the Export JPEG Illustrator Action 

##**Warning: The code below will not run because it has comments.** 
Illustrator actions are very unforgiving and throw an errors unless the formating is perfect. For a working version of this, look at the script file.

##### Unicode Strings & Hex Strings
Illustrator actions convert most unicode strings to hex strings. You can use onlinehextools.com/convert-hex-to-string (or something similar) to convert from hex<=>string.

```
/version 3          		// Probably just an Illustrator Action version number         
	/name [ 4       	// Number of characters in name of the Illustractor Set: set1	01 | 02 | 03 | 04
		73657431	// Hex encoded name of Illustractor Set                         73 | 65 | 74 | 31 
	]               	//                                                              s  | e  | t  | 1   

	/isOpen        0    
	/actionCount   1    
	/action-1 {         
		/name [ 4       	// Number of characters in name of the Illustractor action: act1    01 | 02 | 03 | 04
			61637431	// Hex encoded name of Illustractor action                          61 | 63 | 74 | 31
		]               	//                                                                  a  | c  | t  | 1

		/keyIndex    1
		/colorIndex  0
		/isOpen      1
		/eventCount  1

		/event-1 {
			/useRulersIn1stQuadrant 0
			/internalName (adobe_exportDocument)
			/localizedName [ 9        	// 01 | 02 | 03 | 04 | 05 | 06 | 07 | 08 | 09
				4578706f7274204173	// 45 | 78 | 70 | 6f | 72 | 74 | 20 | 41 | 73         
			]                         	// E  | x  | p  | o  | r  | t  |    | A  | s

			/isOpen          0
			/isOn            1
			/hasDialog       1
			/showDialog      0
			/parameterCount  7         	// Number for 'Export As' setting in the event

			/** defines: export settings

				imagQual = Image Quality
				compMeth = Compression Method
				numScans = Number of Scan (Only applicable with Progressive Compression)
				aliasing = Anti-Aliasing
				imageRes = Image Resolution
				colorMdl = Color Model
				imageMap = Image Map
				mapStyle = Image Map Style
				iccProfl = ICC Profile
			**/
			/parameter-1 {			
				/key 1885434477		 
				/showInPalette 0
				/type (raw)/value < 100

			//	imagQual   compMeth   numScans   aliasing   imageRes   colorMdl   imageMap   mapStyle
				06000000   01000000   03000000   02000000   00002c01   02000000   02000000   02000000   // Each of 8 charater group repersents the individual export settings.

			//	i � m �	   a � g �    e � m �    a � p �
				69006d00   61006700   65006d00   61007000   00000000   00000000   00000000   00000000   // Uknown: The first 32 charactes spellout: i�m�a�g�e�m�a�p�
				00000000   00000000   00000000   00000000   00000000   00000000   00000000   00000000   // Uknown: Padding perhaps?

			//	iccProfl	
				00000100																				
				>
				/size 100
			}

			/** defines: file path for file export **/
			/parameter-2 {
				/key 1851878757
				/showInPalette 4294967295			
				/type (ustring)
				/value [ 42 																				                                      // Number of characters in file export path
					2f506174682f746f2f796f75722f6578706f72742f666f6c6465722f556e7469746c65642d312e6a7067    // /Path/to/your/export/folder/Untitled-1.jpg
				]
			}

			/** defines: image file format **/
			/parameter-3 {
				/key 1718775156
				/showInPalette 4294967295
				/type (ustring)
				/value [ 16 					// Number of characters in file format string
					4a5045472066696c6520666f726d6174	// JPEG file format
				]
			}

			/** defines: file extention **/
			/parameter-4 {
				/key 1702392942
				/showInPalette 4294967295
				/type (ustring)
				/value [ 12 				// Number of characters in file extention string
					6a70672c6a70652c6a706567	// jpg,jpe,jpeg
				]
			}

			/** defines: 'Use Artboards' Checkbox **/
			/parameter-5 {
				/key 1936548194
				/showInPalette 4294967295
				/type (boolean)
				/value 1								              // 1 = checked | 0 = unchecked
			}                                       // If '0' is set (unchecked) then both parameter-6 & parameter-7 are ignored

			/** defines: 'All' or 'Range' Radio Button **/
			/parameter-6 {
				/key 1935764588
				/showInPalette 4294967295
				/type (boolean)
				/value 0								              // 1 = All, 0 = Range
			}                                       // If '1' is set then parameter-7 is ignored

			/** defines: Range of Artbords to Export */
			/parameter-7 {
				/key 1936875886
				/showInPalette 4294967295
				/type (ustring)
				/value [ 0]								            // [ 0] = All, [ 1 31] = Artboard #1 , [ 1 32] = Artboard #2, et cetera
			}
		}
	}
```
