
import { DEFAULT_STORAGE, DEFAULT_STORAGE_TESTING } from "/app/scripts/default_storage.js"



document.addEventListener('DOMContentLoaded', function() {
    var s,
    MenuMaker = {
        settings: {
            // Header
            'editModeButton': document.querySelector('.edit-icon'),
            'editModeActive': false,
            'settingsButton': document.querySelector('.settings-icon'),
            'settingsMenu': document.querySelector('.settings-menu'),
            'colorThemeButton': document.querySelector('.color-theme'),
            'colorThemeSpan': document.querySelector('.color-theme span'),
            'groupTablesButton': document.querySelector('.group-tables'),
            'groupTablesSpan': document.querySelector('.group-tables span'),
            'groupMenuButton': document.querySelector('.group-menu'),
            'groupMenuSpan': document.querySelector('.group-menu span'),
            'numberMenuButton': document.querySelector('.number-menu'),
            'numberMenuSpan': document.querySelector('.number-menu span'),
            'dishSpawnLocButton': document.querySelector('.dish-spawn-loc'),
            'dishSpawnLocSpan': document.querySelector('.dish-spawn-loc span'),

            'importDataButton': document.querySelector('.import-data'),
            'exportDataButton': document.querySelector('.export-data'),
            'deleteTablesButton': document.querySelector('.delete-tables'),
            'deleteMenuButton': document.querySelector('.delete-menu'),
            'deleteArchiveButton': document.querySelector('.delete-archive'),
            'deleteAllButton': document.querySelector('.delete-all'),
            'colorOrder': ['DARK', 'LIGHT', 'GREY', 'SEPIA'],
            // Dish builder and delete overlay
            'controls': document.querySelector('.controls'),
            'buildContainer': document.querySelector('.dish-build-container'),
            'buildInfo': document.querySelector('.build-info'),
            'buildID': document.querySelector('.build-id'),
            'buildTitle': document.querySelector('.build-title'),
            'buildItems': document.querySelector('.build-items'),
            'buildAdd': document.querySelector('.build-add'),
            'buildDeselect': document.querySelector('.build-deselect'),
            'itemDeleteOverlay': document.querySelector('.item-delete-overlay'),
            // Tables
            'tablesContainer': document.querySelector('.tables'),
            'tables': document.querySelectorAll('.table'),
            'tableTitles': document.querySelectorAll('.table-title'),
            'createTableGroupButtons': document.querySelectorAll('.create-table-group'),
            'tableInputs': document.querySelectorAll('.table-input'),
            'tableOrder': ['_0', '_1', '_2', '_3', '_4', '_5', '_6', '_7', '_8', '_9'],
            // Menu
            'menu': document.querySelector('.menu'),
            'menuBody': document.querySelector('.menu-body'),
            'menuGroups': document.querySelectorAll('.menu-group'),
            'menuGroupNames': document.querySelectorAll('.menu-group-name'),
            'menuButton': document.querySelector('.menu-button'),
            //
            'popupContainer': document.querySelector('.popup-container'),
            'popupBox': document.querySelector('.popup'),
            'popupWarning': document.querySelector('.popup-warning'),
            'popupHeader': document.querySelector('.popup-header'),
            'popupBody': document.querySelector('.popup-body'),
            'popupOverlay': document.querySelector('.popup-overlay'),
            //
            'clickItem': null,
            'dragItem': null,
            'dragClone': null,
            'dropBox': null,
            'dragged': false,
            'startPos': {},
            'lastHover': '',
            'isHidden': false,
        },

        // Site init
        init: function() {
            console.log('>> >> >> >> >> >>>>   init   <<<< << << << << <<')
            s = MenuMaker.settings
            MenuMaker.setStorage()
            //MenuMaker.updateWithSessionData()
            //MenuMaker.bindStaticUIActions()
            // MenuMaker.bindDynamicUIActions()
            // MenuMaker.setColorTheme()
            // MenuMaker.setMenuSplit()
        },

        // Checks localStorage for site data, if not found sets default values
        setStorage: function() {
            console.log(">> setStorage")
            let defaultKeys = Object.keys(DEFAULT_STORAGE).sort()
            let storedKeys = Object.keys(localStorage).sort()
            if (defaultKeys.join() !== storedKeys.join()) {
                console.log("\n!!!!!!!!!!!! NEW SESSION !!!!!!!!!!!!! NEW SESSION !!!!!!!!!!!!!\n")
                localStorage.clear()
                defaultKeys.forEach(key => {
                    let strValue = JSON.stringify(DEFAULT_STORAGE_TESTING[key])
                    localStorage.setItem(key, strValue)
                })
            }
            console.log(localStorage)
        },

        // Bind Static UI actions (called at init)
        bindStaticUIActions: function() {
            console.log(">> bindStaticUIActions <<")
            s.editModeButton.addEventListener('click', MenuMaker.toggleEditMode)
            s.settingsButton.addEventListener('click', MenuMaker.toggleSettingsMenu)
            s.colorThemeButton.addEventListener('click', MenuMaker.changeColorTheme)
            s.groupTablesButton.addEventListener('click', MenuMaker.toggleTableGroups)
            s.groupMenuButton.addEventListener('click', MenuMaker.toggleMenuGroups)
            // s.numberMenuButton.addEventListener('click', MenuMaker.toggleMenuNumbers)
            // s.dishSpawnLocButton.addEventListener('click', MenuMaker.setDishSpawn)
            // s.importDataButton.addEventListener('click', MenuMaker.importData)
            // s.exportDataButton.addEventListener('click', MenuMaker.exportData)
            // s.deleteTablesButton.addEventListener('click', MenuMaker.deleteAllTables)
            // s.deleteMenuButton.addEventListener('click', MenuMaker.deleteMenu)
            // s.deleteArchiveButton.addEventListener('click', MenuMaker.deleteArchive)
            // s.deleteAllButton.addEventListener('click', MenuMaker.deleteEverything)

            s.menuButton.addEventListener('click', MenuMaker.openMenu)
            // s.buildID.addEventListener('keydown', MenuMaker.checkKeypress, true)
            // s.buildTitle.addEventListener('keydown', MenuMaker.checkKeypress, true)
            // s.buildAdd.addEventListener('click', MenuMaker.createNewMenuDish)
            // s.buildDeselect.addEventListener('click', MenuMaker.deselectAllItems)

            // s.tableControlButtons.forEach(button => { button.addEventListener('click', MenuMaker.toggleTableControlMenu) })
            // s.tableDeleteButtons.forEach(button => { button.addEventListener('click', MenuMaker.deleteTableItems )})
            // s.tableInputs.forEach(input => { input.addEventListener('keydown', MenuMaker.checkKeypress, true) })
        },

        // Bind dynamic UI actions (called at init and after creating a new table/menu item)
        bindDynamicUIActions: function() {
            console.log(">> bindDynamicUIActions <<")
            // let tableItems = document.querySelectorAll('.table-item')
            // tableItems.forEach(item => { item.addEventListener('mousedown', MenuMaker.clickElement) })

            //let dishDeleteButtons = s.menu.querySelectorAll('.dish-delete')
            //dishDeleteButtons.forEach(button => { button.addEventListener('click', MenuMaker.moveDishToArchive) })
        },

        // Updates site with session data
        updateWithSessionData: function() {
            console.log(">> updateWithSessionData")
            // Update tables
            for (let x = 0; x < 10; x++) {
                // Update table name
                s.tables[x].querySelector('.table-title').innerText = session.tables[x].name
                // Create new groups (if not ungrouped) and fill with items
                let tableItems = s.tables[x].querySelector('.table-items')
                let tableGroups = session.tables[x].groups
                for (let y = 0; y < tableGroups.length; y++) {
                    let groupName = tableGroups[y][0]
                    let groupItems = tableGroups[y][1]
                    let thisGroup = tableItems
                    if (groupName != 'ungrouped') {
                        let newGroup = MenuMaker.createTableGroupHTML(groupName)
                        tableItems.innerHTML += newGroup
                        thisGroup = tableItems.querySelector('.table-group.' + groupName)
                    }
                    if (thisGroup) {
                        for (let z = 0; z < groupItems.length; z++) {
                            let newItem = MenuMaker.createTableItemHTML(groupItems[z])
                            thisGroup.innerHTML += newItem
                        }
                    } else {
                        console.warn("ERROR: " + groupName + " TABLE GROUP NOT FOUND")
                        return
                    }
                }
            }
            // Update menu
            for (let x = 0; x < session.menu.length; x++) {
                let groupName = session.menu[x][0]
                let groupDishes = session.menu[x][1]
                let thisGroup = s.menuBody
                if (groupName != 'ungrouped') {
                    let newGroup = MenuMaker.createMenuGroupHTML(groupName)
                    s.menuBody.innerHTML += newGroup
                    thisGroup = s.menuBody.querySelector('.menu-group.' + groupName)
                }
                if (thisGroup) {
                    for (let y = 0; y < groupDishes.length; y++) {
                        let dish = groupDishes[y]
                        let newItem = MenuMaker.createMenuDishHTML(dish.id, dish.title, dish.items)
                        thisGroup.innerHTML += newItem
                    }
                } else {
                    console.warn("ERROR: " + groupName + " MENU GROUP NOT FOUND")
                    return
                }
            }
        },

        // Creates a new table item based on table input field
        createNewTableItem: function(target) {
            console.log(">> createNewTableItem")
            let text = target.value
            if (text.trim() == '') { return }
            let newItem = MenuMaker.createTableItemHTML(text)
            let tableItems = target.parentElement.querySelector('.table-items')
            tableItems.innerHTML += newItem
            target.value = ''
            // If item was created with edit mode active, set edit mode styles/actions
            if (s.editModeActive) { MenuMaker.toggleTableEditMode() }
            // Rebind UI actions for all items in this table
            MenuMaker.bindDynamicUIActions()
            // Update session
            let table = tableItems.parentElement.parentElement
            let indexClass = table.classList[1]
            let tableIndex = s.tableOrder.indexOf(indexClass)
            session.tables[s.groupIndex][tableIndex].push(text)
            MenuMaker.sendPost()
        },

        //
        createTableGroupHTML: function(groupName) {
            return `
                <div class="table-group hidden ` + groupName + `">
                    <div class="table-group-name">` + groupName + `</div>
                </div>`
        },

        //
        createTableItemHTML: function(itemText) {
            return `
                <div class="table-item">
                    <div class="item-checkbox"><span class="circle"></span></div>
                    <div class="item-content">` + itemText + `</div>
                </div>`
        },

        // // Adds dish to menu, updates session
        // createNewMenuDish: function() {
        //     console.log(">> createNewMenuDish")
        //     let id = s.buildID.value
        //     let title = s.buildTitle.value
        //     let ingredients = s.buildItems.innerText
        //     // Ingredients and description are required, id is optional
        //     if (title.trim() != '' && ingredients.trim() != '') {
        //         let newDish = MenuMaker.createMenuDishHTML(id, title, ingredients)
        //         let group = s.menuGroups[s.groupIndex]
        //         let groupDishes = group.querySelector('.menu-group-dishes')
        //         groupDishes.innerHTML += newDish
        //         group.querySelector('.menu-group-name').classList.remove('hidden')
        //         MenuMaker.deselectAllItems()
        //         MenuMaker.cacheMenu()
        //         MenuMaker.sendPost()
        //         // If dish was created with edit mode active, set edit mode styles/actions
        //         if (s.editModeActive) {
        //             MenuMaker.toggleMenuEditMode()
        //             MenuMaker.toggleButtonsEditMode()
        //         }
        //         // Rebind UI actions for all items in this table
        //         MenuMaker.bindDynamicUIActions()
        //         // Flash menu button color to indicate the dish was added
        //         s.menuButton.style.backgroundColor = 'white'
        //         setTimeout(() => { s.menuButton.style.backgroundColor = '#ff6262' }, 400)
        //     }
        // },

        //
        createMenuGroupHTML: function(groupName) {
            return `
                <div class="menu-group hidden ` + groupName + `">
                    <div class="menu-group-name">` + groupName + `</div>
                </div>`
        },

        //
        createMenuDishHTML: function(id, title, items) {
            return `
                <div class="menu-dish">
                    <div class="dish-info">
                        <div class="dish-id">` + id + `</div>
                        <div class="dish-title">` + title + `</div>
                    </div>
                    <div class="dish-items">` + items + `</div>
                    <div class="dish-delete inactive">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                            <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 
                            56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
                        </svg>
                    </div>
                </div>`
        },

        // Toggle settings menu open/closed
        toggleSettingsMenu: function() {
            console.log(">> toggleSettingsMenu")
            s.settingsButton.classList.toggle('active')
            s.settingsMenu.classList.toggle('hidden')
            if (s.settingsMenu.classList.contains('hidden')) {
                document.removeEventListener('click', MenuMaker.checkSettingsMenuClick, true)
            } else {
                document.addEventListener('click', MenuMaker.checkSettingsMenuClick, true)
            }
        },

        // Runs while settings menu is open, toggles off if user clicks outside of menu
        checkSettingsMenuClick: function(event) {
            console.log(">> checkSettingsMenuClick")
            if (!s.settingsMenu.contains(event.target) && !s.settingsButton.contains(event.target)) {
                MenuMaker.toggleSettingsMenu()
            }
        },

        // // Deletes all items from a single table
        // deleteTableItems: function(event) {
        //     console.log(">> deleteTableItems")
        //     let table = event.target.closest('.table')
        //     let tableItems = table.querySelector('.table-items')
        //     tableItems.innerHTML = ''
        // },

        // //
        // selectTableItem: function(event) {
        //     console.log(">> selectTableItem")
        //     let tableItem = event.target
        //     if (tableItem.classList[0] != 'table-item') {
        //         tableItem = tableItem.closest('.table-item')
        //     }
        //     let textBox = tableItem.querySelector('.item-content')
        //     if (textBox.contains(event.target) && s.editModeActive) { return }
        //     // Only allow one selection per table
        //     let oldItem = tableItem.parentElement.querySelector('.table-item.selected')
        //     if (oldItem) {
        //         if (oldItem != tableItem) { oldItem.classList.toggle('selected') }
        //     }
        //     tableItem.classList.toggle('selected')
        //     MenuMaker.updateBuildBox()
        //     // Set visibility of dish id/title fields
        //     let itemSelected = document.querySelector('.table-item.selected')
        //     if ((itemSelected && s.buildInfo.classList.contains('hidden')) ||
        //         (!itemSelected && !s.buildInfo.classList.contains('hidden'))) {
        //             s.buildInfo.classList.toggle('hidden')
        //     }
        // },

        // // Dish builder deselect button, clear table selecitons and dish builder fields
        // deselectAllItems: function() {
        //     console.log(">> deselectAllItems")
        //     s.buildInfo.classList.add('hidden')
        //     let activeItems = document.querySelectorAll('.table-item.selected')
        //     activeItems.forEach(item => item.classList.toggle('selected'))
        //     s.buildID.value = ''
        //     s.buildTitle.value = ''
        //     s.buildItems.innerText = ''
        // },

        // //
        // updateBuildBox: function() {
        //     console.log(">> updateBuildBox")
        //     let itemList = []
        //     let selectedItems = document.querySelectorAll('.table-item.selected:not(.drag-clone)')
        //     console.log(selectedItems)
        //     selectedItems.forEach(item => { itemList.push(item.querySelector('.item-content').innerText) })
        //     let itemString = itemList.join(', ')
        //     s.buildItems.innerText = itemString
        // },

        //
        toggleEditMode: function() {
            console.log(">> toggleEditMode")
            s.editModeButton.classList.toggle('active')
            s.editModeActive = s.editModeButton.classList.contains('active')
            // If edit mode was turned off, update session
            // if (!s.editModeActive) {
            //     MenuMaker.cacheActiveTables()
            //     MenuMaker.sendPost()
            // }
            // Call functions to toggle contentEditable for divs
            MenuMaker.toggleTableEditMode()
            MenuMaker.toggleMenuEditMode()
            MenuMaker.toggleButtonsEditMode()
        },

        // Toggle edit mode for tables
        toggleTableEditMode: function() {
            s.tables.forEach(table => {
                let tableTitle = table.querySelector('.table-title')
                let tableItems = table.querySelectorAll('.item-content')
                if (s.editModeActive) {
                    tableTitle.addEventListener('keydown', MenuMaker.checkKeypress, true)
                    tableTitle.style.cursor = 'text'
                    tableTitle.contentEditable = true
                    tableItems.forEach(item => {
                        item.addEventListener('keydown', MenuMaker.checkKeypress, true)
                        item.style.cursor = 'text'
                        item.contentEditable = true
                    })
                } else {
                    tableTitle.removeEventListener('keydown', MenuMaker.checkKeypress, true)
                    tableTitle.style.cursor = 'default'
                    tableTitle.contentEditable = false
                    tableItems.forEach(item => {
                        item.removeEventListener('keydown', MenuMaker.checkKeypress, true)
                        item.style.cursor = 'pointer'
                        item.contentEditable = false
                    })
                }
            })
        },

        // Toggle edit mode for menu
        toggleMenuEditMode: function() {
            let dishList = s.menuBody.querySelectorAll('.menu-dish')
            dishList.forEach(dish => {
                let dishID = dish.querySelector('.dish-id')
                let dishTitle = dish.querySelector('.dish-title')
                let dishItems = dish.querySelector('.dish-items')
                if (s.editModeActive) {
                    dishID.addEventListener('keydown', MenuMaker.checkKeypress, true)
                    dishTitle.addEventListener('keydown', MenuMaker.checkKeypress, true)
                    dishItems.addEventListener('keydown', MenuMaker.checkKeypress, true)
                    dishID.style.cursor = 'text'
                    dishTitle.style.cursor = 'text'
                    dishItems.style.cursor = 'text'
                    dishID.contentEditable = true
                    dishTitle.contentEditable = true
                    dishItems.contentEditable = true
                } else {
                    dishID.removeEventListener('keydown', MenuMaker.checkKeypress, true)
                    dishTitle.removeEventListener('keydown', MenuMaker.checkKeypress, true)
                    dishItems.removeEventListener('keydown', MenuMaker.checkKeypress, true)
                    dishID.style.cursor = 'pointer'
                    dishTitle.style.cursor = 'pointer'
                    dishItems.style.cursor = 'pointer'
                    dishID.contentEditable = false
                    dishTitle.contentEditable = false
                    dishItems.contentEditable = false
                }
            })
        },

        // Toggle edit mode for delete buttons
        toggleButtonsEditMode: function() {
            let menuButtons = s.menuBody.querySelectorAll('.dish-delete')
            if (menuButtons.length) {
                if (s.editModeActive) {
                    menuButtons.forEach(button => button.classList.remove('inactive'))
                } else {
                    menuButtons.forEach(button => button.classList.add('inactive'))
                }
            }
        },

        // // Check keypresses while in edit mode
        // checkKeypress: function(event) {
        //     console.log("checkKeypress")
        //     if (event.key === 'Escape' || event.keyCode === 27) {
        //         document.removeEventListener('keypress', MenuMaker.checkKeypress, true)
        //         if (s.editModeActive) { MenuMaker.toggleEditMode() }
        //     } else if (event.key === 'Enter' || event.keyCode == 13) {
        //         if (event.target.className == 'table-input') {
        //             MenuMaker.createNewTableItem(event.target)
        //         } else {
        //             event.target.blur()
        //         }
        //     } else if (event.key === 'Tab' || event.KeyCode == 9) {
        //         event.preventDefault()
        //     } else if (String.fromCharCode(event.keyCode).match(/(\w|\s)/g)) {
        //         let charCount, elementClass
        //         if (event.target.tagName == 'DIV') {
        //             charCount = event.target.innerText.length
        //             elementClass = event.target.classList[0]
        //         } else if (event.target.tagName == 'INPUT') {
        //             charCount = event.target.value.length
        //             elementClass = event.target.className
        //         }
        //         if ((charCount >= 250) ||
        //             ((charCount >= 60) && (elementClass == 'dish-title' || elementClass == 'build-title')) ||
        //             ((charCount >= 40) && (elementClass == 'item-content' || elementClass == 'table-input' || elementClass == 'group-name')) ||
        //             ((charCount >= 25) && (elementClass == 'table-title')) ||
        //             ((charCount >= 4) && (elementClass == 'dish-id' || elementClass == 'build-id'))) {
        //             event.preventDefault()
        //         }
        //     }
        // },

        // Toggle menu visibility
        openMenu: function() {
            console.log(">> openMenu")
            s.menu.classList.toggle('hidden')
        },

        // Increments color theme setting, updates session
        changeColorTheme: function() {
            console.log(">> changeColorTheme")
            let theme = (session.settings.color_theme + 1) % 4
            session.settings.color_theme = theme
            MenuMaker.setColorTheme()
            //MenuMaker.sendPost()
        },

        // Sets site colors based on session
        setColorTheme: function() {
            console.log(">> setColorTheme")
            let theme = ['DARK', 'LIGHT', 'GREY', 'SEPIA'][session.settings.color_theme]
            s.colorThemeSpan.innerText = theme
            // UNFINISHED UNFINISHED UNFINISHED
            if (theme == 'DARK') {
                document.documentElement.style.setProperty('--background1', '#303040')
                // document.documentElement.style.setProperty('--background2', '#00000033')
                document.documentElement.style.setProperty('--dishBuilderBackground', '#00000080')
                document.documentElement.style.setProperty('--tableBackground', '#000000')
                document.documentElement.style.setProperty('--tableItemBackground', '#000000')
                document.documentElement.style.setProperty('--tableItemHover', '#FFFFFF0F')
                document.documentElement.style.setProperty('--menuBackground', '#0C0B18')
                document.documentElement.style.setProperty('--popupBackground', '#000000')
                document.documentElement.style.setProperty('--popupRowBackground', '#FFFFFF1A')
                document.documentElement.style.setProperty('--popupBorder', '#FFFFFF33')
                document.documentElement.style.setProperty('--text1', '#FFFFFF')
                document.documentElement.style.setProperty('--text1-50', '#FFFFFF7F')
                document.documentElement.style.setProperty('--text2', '#000000')
                document.documentElement.style.setProperty('--text3', '#FFFFFF')
                document.documentElement.style.setProperty('--placeholderText', '#8E8E8E')
            } else if (theme == 'LIGHT') {
                document.documentElement.style.setProperty('--background1', '#E9ECE6')
                // document.documentElement.style.setProperty('--background2', '#00000033')
                document.documentElement.style.setProperty('--dishBuilderBackground', '#717f81')
                document.documentElement.style.setProperty('--tableBackground', '#717f81')
                document.documentElement.style.setProperty('--tableItemBackground', '#FFFFFF')
                document.documentElement.style.setProperty('--tableItemHover', '#FFFFFFBF')
                document.documentElement.style.setProperty('--menuBackground', '#DAE2E3')
                document.documentElement.style.setProperty('--popupBackground', '#FFFFFF')
                document.documentElement.style.setProperty('--popupRowBackground', '#0000001A')
                document.documentElement.style.setProperty('--popupBorder', '#00000033')
                document.documentElement.style.setProperty('--text1', '#000000')
                document.documentElement.style.setProperty('--text1-50', '#0000007F')
                document.documentElement.style.setProperty('--text2', '#FFFFFF')
                document.documentElement.style.setProperty('--text3', '#FFFFFF')
                document.documentElement.style.setProperty('--placeholderText', '#FFFFFFBF')
            } else if (theme == 'GREY') {
                document.documentElement.style.setProperty('--background1', '#737373')

            } else if (theme == 'SEPIA') {
                document.documentElement.style.setProperty('--background1', '#DBCBB7')
            }
        },

        // Changes visibility of table groups, updates session
        toggleTableGroups: function() {
            console.log(">> toggleTableGroups")
            session.settings.group_tables = session.settings.group_tables == 0 ? 1 : 0
            MenuMaker.setTableGroups()
            // MenuMaker.sendPost()
        },

        // Sets visibility of table groups based on session
        setTableGroups: function() {
            console.log(">> setTableGroups")
            let tableGroups = document.querySelectorAll('.table-group')
            if (session.settings.group_tables == 0) {
                s.groupTablesSpan.innerText = 'OFF'
                tableGroups.forEach(group => group.classList.add('hidden'))
            } else {
                s.groupTablesSpan.innerText = 'ON'
                tableGroups.forEach(group => group.classList.remove('hidden'))
            }
        },

        // Changes visibility of menu groups, updates session
        toggleMenuGroups: function() {
            console.log(">> toggleMenuGroups")
            session.settings.group_menu = session.settings.group_menu == 0 ? 1 : 0
            MenuMaker.setMenuGroups()
            // MenuMaker.sendPost()
        },

        // Sets visibility of menu groups based on session
        setMenuGroups: function() {
            console.log(">> setMenuGroups")
            let menuGroups = document.querySelectorAll('.menu-group')
            if (session.settings.group_menu == 0) {
                s.groupMenuSpan.innerText = 'OFF'
                menuGroups.forEach(group => group.classList.add('hidden'))
            } else {
                s.groupMenuSpan.innerText = 'ON'
                menuGroups.forEach(group => group.classList.remove('hidden'))
            }
        },

        // // Export data, converts session into a base64 encoded string for user to copy
        // exportData: function() {
        //     s.popupWarning.classList.add('hidden')
        //     s.popupHeader.innerText = 'Click to copy:'
        //     let base64 = btoa(JSON.stringify(session))
        //     s.popupBody.innerText = MenuMaker.reverseString(base64)
        //     s.popupBody.contentEditable = false
        //     s.popupBody.style.cursor = 'pointer'
        //     MenuMaker.togglePopupBox(false)
        // },

        // //
        // importData: function() {
        //     s.popupWarning.innerText = 'WARNING: Your current data will be replaced'
        //     s.popupWarning.classList.remove('hidden')
        //     s.popupHeader.innerText = 'Paste exported data below:'
        //     s.popupBody.innerText = ''
        //     s.popupBody.contentEditable = true
        //     s.popupBody.style.cursor = 'text'
        //     MenuMaker.togglePopupBox(true)
        // },

        // //
        // togglePopupBox: function(isImport) {
        //     console.log(">> togglePopupBox")
        //     s.popupContainer.classList.toggle('hidden')
        //     if (s.popupContainer.classList.contains('hidden')) {
        //         if (isImport) {
        //             document.removeEventListener('click', MenuMaker.checkPopupClickImport, true)
        //             document.removeEventListener('input', MenuMaker.checkPopupKeypress, true)
        //         } else {
        //             document.removeEventListener('click', MenuMaker.checkPopupClickExport, true)
        //         }
        //     } else {
        //         if (isImport) {
        //             document.addEventListener('click', MenuMaker.checkPopupClickImport, true)
        //             document.addEventListener('input', MenuMaker.checkPopupKeypress, true)
        //         } else {
        //             document.addEventListener('click', MenuMaker.checkPopupClickExport, true)
        //         }
        //     }
        // },

        // // Checks clicks while popup is open, ends when user clicks outside of popup
        // checkPopupClickImport: function(event) {
        //     console.log(">> checkPopupClick")
        //     let target = event.target
        //     if (!s.popupBox.contains(target)) {
        //         document.removeEventListener('click', MenuMaker.checkPopupClickImport, true)
        //         MenuMaker.togglePopupBox()
        //     }
        // },

        // // Checks if user input is a valid base64 encoded session object, updates session
        // checkPopupKeypress: function(event) {
        //     console.log(">> checkPopupKeypress")
        //     let newSession
        //     let isValid = false
        //     let input = MenuMaker.reverseString(s.popupBody.innerText)
        //     let base64Regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/
        //     let dictRegex = /\{(.)+\}/g
            
        //     if (base64Regex.test(input)) {
        //         input = atob(input)
        //         if (dictRegex.test(input)) {
        //             try {
        //                 newSession = JSON.parse(input)
        //                 if (s.sessionKeys.every(key => newSession.hasOwnProperty(key))) { isValid = true }
        //             } catch { console.log("MISSING KEYS or INVALID OBJECT") }
        //         }
        //     }
            
        //     if (!isValid) {
        //         s.popupWarning.innerText = 'INVALID INPUT'
        //     } else {
        //         s.popupWarning.innerText = 'VALID INPUT - UPADING SITE'
        //         session = newSession
        //         MenuMaker.wipeTablesAndMenus()
        //         MenuMaker.init()
        //         MenuMaker.sendPost()
        //         setTimeout(function() { s.popupOverlay.click() }, 2000)
        //     }
        // },

        // // Checks clicks while popup is open, ends when user clicks outside of popup
        // checkPopupClickExport: function(event) {
        //     console.log(">> checkPopupClick")
        //     let target = event.target
        //     if (!s.popupBox.contains(target)) {
        //         document.removeEventListener('click', MenuMaker.checkPopupClickExport, true)
        //         MenuMaker.togglePopupBox()
        //     } else {
        //         navigator.clipboard.writeText(s.popupBody.innerText)
        //         let bColor = document.documentElement.style.getPropertyValue('--popupBackground')
        //         s.popupBox.style.backgroundColor = 'green'
        //         setTimeout(function() { s.popupBox.style.backgroundColor = bColor }, 300)
        //     }
        // },

        // // Returns reversed string (used to obfuscate base64 encoded session)
        // reverseString: function(str) {
        //     return str.split('').reverse().join('')
        // },

        // // Updates session with the active table names/items (pulled from HTML)
        // // Called before changing table group with edit mode active
        // cacheActiveTables: function() {
        //     console.log(">> cacheActiveTables")
        //     let tableNames = ['', '', '', '', '', '', '', '', '', '']
        //     let tableData = [[], [], [], [], [], [], [], [], [], []]
        //     for (let x = 0; x < 10; x++) {
        //         let table = s.tables[x]
        //         tableNames[x] = table.querySelector('.table-title').innerText
        //         let tableItems = table.querySelectorAll('.item-content')
        //         for (let y = 0; y < tableItems.length; y++) {
        //             tableData[x].push(tableItems[y].innerText)
        //         }
        //     }
        //     session.names[s.groupIndex].tables = tableNames
        //     session.tables[s.groupIndex] = tableData
        // },

        // // Updates session with the current menu dishes
        // // Re-caching the entire menu is easier than deleting specific dishes from the session
        // cacheMenu: function() {
        //     for (let x = 0; x < 5; x++) {
        //         let dishList = []
        //         let dishes = s.menuGroups[x].querySelectorAll('.menu-dish')
        //         dishes.forEach(dish => {
        //             let d = {
        //                 'id': dish.querySelector('.dish-id').innerText,
        //                 'title': dish.querySelector('.dish-title').innerText,
        //                 'items': dish.querySelector('.dish-items').innerText
        //             }
        //             dishList.push(d)
        //         })
        //         session.menu[x] = dishList
        //     }
        // },

        // // POST updated session object to Flask
        // sendPost: function() {
        //     console.log(">> postSession")
        //     let data = new FormData()
        //     data.append('names', JSON.stringify(session.names))
        //     data.append('tables', JSON.stringify(session.tables))
        //     data.append('menu', JSON.stringify(session.menu))
        //     data.append('settings', JSON.stringify(session.settings))
        //     let xhr = new XMLHttpRequest
        //     xhr.responseType = 'json'
        //     xhr.open('POST', '/')
        //     xhr.send(data)
        // },

        // // Deletes all ingredients and dishes
        // wipeTablesAndMenus: function() {
        //     console.log(">> wipeTablesAndMenus")
        //     s.tables.forEach(table => {
        //         let tableItems = table.querySelector('.table-items')
        //         tableItems.innerHTML = ''
        //     })
        //     s.menuGroups.forEach(menu => {
        //         let menuDishes = menu.querySelector('.menu-group-dishes')
        //         menuDishes.innerHTML = ''
        //     })
        // },


        // //
        // clickElement: function(event) {
        //     console.log(">> clickElement")
        //     s.clickItem = event.target
        //     document.addEventListener('mouseup', MenuMaker.dropElement)
        //     document.addEventListener('mousemove', MenuMaker.dragElement)
        // },

        // //
        // grabElement: function(event) {
        //     console.log(">> grabElement")
        //     // clickItem used instead of event.target to prevent error if grabbing by border
        //     s.dragItem = s.clickItem.closest('.table-item')
        //     let clone = s.dragItem.cloneNode(true)
        //     s.dragItem.classList.add('drag-item')
        //     clone.classList.add('drag-clone')
        //     document.body.append(clone)
        //     s.dragClone = document.querySelector('.drag-clone')

        //     let pos = s.dragItem.getBoundingClientRect()
        //     s.startPos = {
        //         'offsetX': event.clientX - pos.left,
        //         'offsetY': event.clientY - pos.top
        //     }
        //     s.dragClone.style.left = pos.left + 'px'
        //     s.dragClone.style.top = pos.top + 'px'
        // },

        // //
        // dragElement: function(event) {
        //     console.log(">> dragElement")
        //     if (!s.dragged) {
        //         s.dragged = true
        //         MenuMaker.toggleItemDeleteOverlay()
        //         MenuMaker.grabElement(event)
        //     }
        //     s.dragClone.style.left = (event.clientX - s.startPos.offsetX) + 'px' 
        //     s.dragClone.style.top = (event.clientY - s.startPos.offsetY) + 'px'

        //     // Detect when mouse enters a valid drop point, update DOM
        //     s.dragClone.style.visibility = 'hidden'
        //     let hoverElement = document.elementFromPoint(event.clientX, event.clientY)
        //     if (!hoverElement) { return }
        //     let hoverClasses = [...hoverElement.classList].join('')
        //     s.dragClone.style.visibility = 'visible'
        //     if (s.lastHover !== hoverClasses) {
        //         s.lastHover = hoverClasses
        //         s.dropBox = MenuMaker.isValidDrop(hoverElement)
        //         let draggingOverDelete = false
        //         // Update DOM while dragging over valid drop locations
        //         if (s.dropBox) {
        //             console.log("DROP BOX: ", s.dropBox)
        //             if (s.dropBox.classList.contains('controls')) {
        //                 s.isHidden = true
        //                 draggingOverDelete = true
        //                 s.itemDeleteOverlay.classList.add('drop')
        //                 s.dragItem.style.display = 'none'
        //             }
        //             else if (s.dropBox.classList.contains('table')) {
        //                 let tableDropPos = MenuMaker.getTableDropPos(s.dropBox, event.clientY)
        //                 MenuMaker.insertChildAtIndex(s.dropBox, tableDropPos)
        //             } else if (s.dropBox.classList.contains('menu')) {
        //                 console.log("MENU DROP")
        //             }
        //         }
        //         // Reset delete item overlay styles, unhide element
        //         if (s.isHidden && !draggingOverDelete) {
        //             s.isHidden = false
        //             s.itemDeleteOverlay.classList.remove('drop')
        //             s.dragItem.style.display = 'block'
        //         }
        //     }
            
        // },

        // //
        // dropElement: function(event) {
        //     console.log(">> dropElement")
        //     if (s.dragged) {
        //         if (s.dropBox) {
        //             if (s.dropBox.classList.contains('controls')) {
        //                 s.dragItem.remove()
        //             } else if (s.dropBox.classList.contains('table')) {
        //                 let activeItems = s.dropBox.querySelectorAll('.table-item.selected')
        //                 if (activeItems.length > 1) {
        //                     activeItems.forEach(item => { item.classList.remove('selected') })
        //                     MenuMaker.updateBuildBox()
        //                 }
        //             }
        //         }
        //         s.dragged = false
        //         s.dragItem.classList.remove('drag-item')
        //         s.dragClone.remove()
        //         s.clickItem = null
        //         s.dragItem = null
        //         s.dragClone = null
        //         s.dropBox = null
        //         MenuMaker.toggleItemDeleteOverlay()
        //         MenuMaker.cacheActiveTables()
        //         MenuMaker.cacheMenu()
        //         MenuMaker.sendPost()
        //     } else {
        //         MenuMaker.selectTableItem(event)
        //     }
        //     document.removeEventListener('mousemove', MenuMaker.dragElement)
        //     document.removeEventListener('mouseup', MenuMaker.dropElement)
        // },

        // //
        // isValidDrop: function(hoverElement) {
        //     console.log(">> isValidDrop")
        //     let target = null
        //     if (!target) { target = hoverElement.closest('.table') }
        //     if (!target) { target = hoverElement.closest('.controls') }
        //     if (!target) { target = hoverElement.closest('.menu') }
        //     return target
        // },

        // // 
        // getTableDropPos: function(table, clientY) {
        //     console.log(">> getTableDropPos")
        //     let items = table.querySelectorAll('.table-item')
        //     if (!items) { return 0 }
        //     for (let i = 0; i < items.length; i++) {
        //         let itemBox = items[i].getBoundingClientRect()
        //         let middle = itemBox.bottom - (itemBox.height / 2)
        //         if (clientY <= middle) { return i }
        //     }
        //     return items.length
        // },

        // //
        // insertChildAtIndex: function(dropBox, index) {
        //     console.log(">> insertChildAtIndex")
        //     let parent
        //     if (dropBox.classList.contains('table')) {
        //         parent = dropBox.querySelector('.table-items')
        //     } else if (dropBox.classList.contains('.menu-group')) {
        //         parent = dropBox.querySelector('.menu-group-dishes')
        //     } else {
        //         console.warn("ERROR INVALID DROPBOX")
        //         return
        //     }
        //     if (index > parent.children.length) {
        //         parent.appendChild(s.dragItem)
        //     } else {
        //         parent.insertBefore(s.dragItem, parent.children[index])
        //     }
        // },

        //
        toggleItemDeleteOverlay: function() {
            s.itemDeleteOverlay.classList.toggle('hidden')
        },


    }
    MenuMaker.init()
})