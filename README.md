# ExportDocAsJPEG
My design workflow for Illustrator frequently requires me to export 300dpi CMYK JPEG images. The `ExportDocAsJPEG.jsx` reduces this laborious multi-step process (7+ clicks) down to two clicks or a single keyboard shortcut (macOS only).

#### Disclaimer
The `ExportDocAsJPEG.jsx` script has only been tested on **macOS High Sierra (10.13.6)** and **Adobe Illustrator CC 2020 (24.3)**. While it should work on other versions of macOS and Adobe Illustrator, I cannot make any guarantees. You may need to adjust to fit your setup. 

It theoretically should also work on Windows, as I don't believe there is any OS dependent code. However, proceed at your own risk.

---------

## 1. Installation
1. Download [ExportDocAsJPEG.jsx](ExportDocAsJPEG.jsx) 
2. Move into the [Adobe Illustrator Scripts folder](https://helpx.adobe.com/illustrator/using/automation-scripts.html)  
    - macOS:    `Applications/Adobe\ Illustrator\ 2020/Presets/[en_US]/Scripts`
    - windows:  `C:\Program Files\Adobe\Adobe Illustrator 2020\Presets\en_US\Scripts`
  
3. Restart Illustrator if the application was running when you installed the script
4. In Illustrator, navigate to `File => Scripts` submenu and click `ExportDocAsJPEG.jsx` to run the script.


## 2. Customizing
If you want customize the script and better understand how the Illustrator action is built, you can reference [ScriptSettings.md](ScriptSettings.md). It breaks down the different sections of the action and how to modify them.

For more information on scripting illustrator look at the adobe forums:
- [Creating a dynamic action to use with app.doScript() method.](https://community.adobe.com/t5/illustrator/creating-a-dynamic-action-to-use-with-app-doscript-method/td-p/8918373)
- [Dynamic actions with app.doScript() method](https://community.adobe.com/t5/illustrator/dynamic-actions-with-app-doscript-method/td-p/10569163)


## 3. Assigning a Keyboard Shortcut (**macOS ONLY**)
Illustrator currently doesn't allow you to assign a keyboard shortcut to any script in the `File => Scripts` submenu. However, you can get around this limitation by creating an Automator service for Illustrator that runs `ExportDocAsJPEG.jsx` and assign that service a keyboard shortcut through `System Peferences => Keyboard => Shortcuts => Services`

#### 1. Install Automator Service 

**Option A: Automatic**
1. Download the [ExportDocAsJPEG.workflow](ExportDocAsJPEG.workflow) Automator service.
2. Double click on the file and the Automator `Service Installer` will prompt you to install the shortcut

**Option B: Manual**
1. Create an new Automator Service.
2. In Automator, add a `Get Specified Finder Items`
    - 2a. Click the `Add` button and navigate to the script location and click `Add`
3. In Automater, add an `Open Finder Items`
    - 3a. Click the `Open With` dropdown menu, scroll down, and select `Other...`
    - 3b. Navigate to `Applications => Adobe Illustrator 2020 => Adobe Illustrator.app`
4. Save 

<details>
  	<summary>Click to see a screenshot of the Automator Build Settings</a></summary>
	<img src="/ExportDocAsJPEG.workflow/Contents/QuickLook/Preview.png">
</details>

#### 2. Assign Keyboard Shortcut
Launch `System Prefernces` and assign a keyboard shortcut by navigating to `Keyboard => Shortcuts => Services`. For help visit [Create keyboard shortcuts for apps on Mac](https://support.apple.com/guide/mac-help/create-keyboard-shortcuts-for-apps-mchlp2271/).
<details>
  	<summary>Click to see a screenshot of the Keyboard Shortcuts</a></summary>
	<img src="/screenshots/window_Services_Shortcut.png">
</details>
