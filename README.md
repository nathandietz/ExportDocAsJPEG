# Illustrator JPEG Exporter
My Illustrator design workflow frequently requires me to export 300dpi CMYK JPEG images. The `ExportDocAsJPEG.jsx` reduces this laborious multi-step (7+ clicks) process down to two clicks or a single keyboard shortcut (macOS only).

---------
#### Disclaimer
The `ExportDocAsJPEG.jsx` script has only been tested on **macOS High Sierra (10.13.6)** and **Adobe Illustrator CC 2020 (24.3)**. While it should work on other versions of macOS and Adobe Illustrator, I cannot make any guarantees. You may need to adjust to fit your setup. It theoretically should also work on Windows, as I don't believe there is any OS dependent code. Proceed at your own risk. 

---------

## 1. Installation
1. Download [ExportDocAsJPEG.jsx](ExportDocAsJPEG.jsx)  
2. Move into the [Adobe Illustrator Scripts folder](https://helpx.adobe.com/illustrator/using/automation-scripts.html)  
    - macOS:    `Applications/Adobe\ Illustrator\ 2020/Presets/[en_US]/Scripts`
    - windows:  `C:\Program Files\Adobe\Adobe Illustrator 2020\Presets\en_US\Scripts`
  
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
