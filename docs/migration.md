☁️ Migration Guides

- [@fullkekw/fkw-popup@1.2.5](#fullkekwfkw-popup125)

## @fullkekw/fkw-popup@1.2.5
> [!IMPORTANT]
> PopupLayer was reworked into context-provider. Layer for popup is now build-in PopupWindow

- PopupDialog renamed into PopupWindow
- PopupButton ```togglePopupId``` renamed into ```popupId```
- PopupWindow states renamed (state > isOpen; stateSetter > setIsOpen)
- PopupWindow settings migrated into ```settings``` props
- Dependencies: react, classnames moved into DevDependencies
- Removed most popup intrefaces from export