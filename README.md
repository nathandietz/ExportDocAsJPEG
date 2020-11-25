# Illustrator JPEG Exporter
This script automates the laborious multi-step of exporting a CMYK 300dpi JPEG from Illustrator.

## 1. Installation
1. Download [ExportDocAsJPEG.jsx](ExportDocAsJPEG.jsx)  
2. Move into the [Adobe Illustrator Scripts folder](https://helpx.adobe.com/illustrator/using/automation-scripts.html)  
    - For macOS: `Applications/Adobe\ Illustrator\ 2020/Presets/[en_US]/Scripts`
  
3. Restart Illustrator if the application was running when you installed the script
4. In Illustrator, navigate to `File => Scripts` submenu and click `ExportDocAsJPEG.jsx` to run the script.


## 2. Assigning a Keyboard Shortcut (**macOS ONLY**)
Illustrator currently doesn't allow you to assign a keyboard shortcut to any script in the `File => Scripts` submenu. However, you can get around this limitation by creating an Automator service for Illustrator that runs `ExportDocAsJPEG.jsx` and assign that a keyboard shortcut through `System Peferences => Keyboard => Shortcuts => Services`

#### Easy Way
1. Download the [ExportDocAsJPEG.workflow](ExportDocAsJPEG.workflow) Automator services.
2. Double click on the file and the Automator `Service Installer` will prompt you to install the shortcut
3. Assign a keyboard shortcut `System Peferences => Keyboard => Shortcuts => Services` 

#### Manual Way
1. Create an new Automator Service.
2. In Automator, add a `Get Specified Finder Items`
    - 2a. Click the `Add` button and navigate to the script location and click `Add`
3. In Automater, add an `Open Finder Items`
    - 3a. Click the `Open With` dropdown menu, scroll down, and select `Other...`
    - 3b. Navigate to `Applications => Adobe Illustrator 2020 => Adobe Illustrator.app`
4. Save 
4. Assign a keyboard shortcut `System Peferences => Keyboard => Shortcuts => Services`   
 
![Automator Build Settings](/ExportDocAsJPEG.workflow/Contents/QuickLook/Preview.png)


## Understanding the Illustrator Action
If you want to better understand how the Illustrator action is built, you can reference [Illustractor_Action_Breakdown.md](Illustractor_Action_Breakdown.md). It breaks down the different sections of the action and how to modify them.
