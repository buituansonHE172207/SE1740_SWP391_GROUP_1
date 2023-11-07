/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
/**
 * @module ui/list/listitemgroupview
 */
import View from '../view';
import ListView from './listview';
import { uid } from '@ckeditor/ckeditor5-utils';
/**
 * The list item group view class.
 */
export default class ListItemGroupView extends View {
    /**
     * @inheritDoc
     */
    constructor(locale) {
        super(locale);
        const bind = this.bindTemplate;
        const groupLabelId = `ck-editor__label_${uid()}`;
        const nestedList = new ListView(locale);
        this.children = this.createCollection();
        this.children.addMany([this._createLabel(groupLabelId), nestedList]);
        this.set({
            label: '',
            isVisible: true
        });
        nestedList.set({
            role: 'group',
            ariaLabelledBy: groupLabelId
        });
        // Disable focus tracking and accessible navigation in the child list.
        nestedList.focusTracker.destroy();
        nestedList.keystrokes.destroy();
        this.items = nestedList.items;
        this.setTemplate({
            tag: 'li',
            attributes: {
                role: 'presentation',
                class: [
                    'ck',
                    'ck-list__group',
                    bind.if('isVisible', 'ck-hidden', value => !value)
                ]
            },
            children: this.children
        });
    }
    /**
     * Creates a label for the group.
     */
    _createLabel(groupLabelId) {
        const labelView = new View(this.locale);
        const bind = this.bindTemplate;
        labelView.setTemplate({
            tag: 'span',
            attributes: {
                id: groupLabelId
            },
            children: [
                { text: bind.to('label') }
            ]
        });
        return labelView;
    }
    /**
     * Focuses the list item.
     */
    focus() {
        if (this.items.first) {
            this.items.first.focus();
        }
    }
}
