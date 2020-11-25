# Illustrator JPEG Exporter
This script automates the laborious multi-step of exporting a CMYK 300dpi JPEG from Illustrator.

## 1. Installation
1. Download [ExportDocAsJPEG.jsx](ExportDocAsJPEG.jsx)  
2. Move into the [Adobe Illustrator Scripts folder](https://helpx.adobe.com/illustrator/using/automation-scripts.html)  
    - For macOS: `Applications/Adobe\ Illustrator\ 2020/Presets/[en_US]/Scripts`
  
3. Restart Illustrator if the application was running when you installed the script
4. In Illustrator, navigate to `File => Scripts` submenu and click `ExportDocAsJPEG.jsx` to run the script.


## 2. Assigning a Keyboard Shortcut (optional)
Illustrator currently doesn't allow you to assign a keyboard shortcut to any script in the `File => Scripts` submenu. However, you can get around this limitation by creating an Automator service for Illustrator that runs `ExportDocAsJPEG.jsx` and assign that a keyboard shortcut through `System Peferences => Keyboard => Shortcuts => Services`



## Understanding the Illustrator Action
If you want to better understand how the Illustrator action is built, you can reference [Illustractor_Action_Breakdown.md](Illustractor_Action_Breakdown.md). It breaks down the different sections of the action and how to modify them.
