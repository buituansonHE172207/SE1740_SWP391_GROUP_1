/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
/**
 * @module font/fontsize/fontsizeui
 */
import { Plugin } from 'ckeditor5/src/core';
import { Model, createDropdown, addListToDropdown } from 'ckeditor5/src/ui';
import { Collection } from 'ckeditor5/src/utils';
import { normalizeOptions } from './utils';
import { FONT_SIZE } from '../utils';
import '../../theme/fontsize.css';
import fontSizeIcon from '../../theme/icons/font-size.svg';
/**
 * The font size UI plugin. It introduces the `'fontSize'` dropdown.
 */
export default class FontSizeUI extends Plugin {
    /**
     * @inheritDoc
     */
    static get pluginName() {
        return 'FontSizeUI';
    }
    /**
     * @inheritDoc
     */
    init() {
        const editor = this.editor;
        const t = editor.t;
        const options = this._getLocalizedOptions();
        const command = editor.commands.get(FONT_SIZE);
        const accessibleLabel = t('Font Size');
        // Register UI component.
        editor.ui.componentFactory.add(FONT_SIZE, locale => {
            const dropdownView = createDropdown(locale);
            addListToDropdown(dropdownView, () => _prepareListOptions(options, command), {
                role: 'menu',
                ariaLabel: accessibleLabel
            });
            // Create dropdown model.
            dropdownView.buttonView.set({
                label: accessibleLabel,
                icon: fontSizeIcon,
                tooltip: true
            });
            dropdownView.extendTemplate({
                attributes: {
                    class: [
                        'ck-font-size-dropdown'
                    ]
                }
            });
            dropdownView.bind('isEnabled').to(command);
            // Execute command when an item from the dropdown is selected.
            this.listenTo(dropdownView, 'execute', evt => {
                editor.execute(evt.source.commandName, { value: evt.source.commandParam });
                editor.editing.view.focus();
            });
            return dropdownView;
        });
    }
    /**
     * Returns options as defined in `config.fontSize.options` but processed to account for
     * editor localization, i.e. to display {@link module:font/fontconfig~FontSizeOption}
     * in the correct language.
     *
     * Note: The reason behind this method is that there is no way to use {@link module:utils/locale~Locale#t}
     * when the user configuration is defined because the editor does not exist yet.
     */
    _getLocalizedOptions() {
        const editor = this.editor;
        const t = editor.t;
        const localizedTitles = {
            Default: t('Default'),
            Tiny: t('Tiny'),
            Small: t('Small'),
            Big: t('Big'),
            Huge: t('Huge')
        };
        const options = normalizeOptions((editor.config.get(FONT_SIZE)).options);
        return options.map(option => {
            const title = localizedTitles[option.title];
            if (title && title != option.title) {
                // Clone the option to avoid altering the original `namedPresets` from `./utils.js`.
                option = Object.assign({}, option, { title });
            }
            return option;
        });
    }
}
/**
 * Prepares FontSize dropdown items.
 */
function _prepareListOptions(options, command) {
    const itemDefinitions = new Collection();
    for (const option of options) {
        const def = {
            type: 'button',
            model: new Model({
                commandName: FONT_SIZE,
                commandParam: option.model,
                label: option.title,
                class: 'ck-fontsize-option',
                role: 'menuitemradio',
                withText: true
            })
        };
        if (option.view && typeof option.view !== 'string') {
            if (option.view.styles) {
                def.model.set('labelStyle', `font-size:${option.view.styles['font-size']}`);
            }
            if (option.view.classes) {
                def.model.set('class', `${def.model.class} ${option.view.classes}`);
            }
        }
        def.model.bind('isOn').to(command, 'value', value => value === option.model);
        // Add the option to the collection.
        itemDefinitions.add(def);
    }
    return itemDefinitions;
}
