/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
/**
 * @module ui/list/listitemgroupview
 */
import View from '../view';
import type ViewCollection from '../viewcollection';
import ListView from './listview';
import { type Locale } from '@ckeditor/ckeditor5-utils';
/**
 * The list item group view class.
 */
export default class ListItemGroupView extends View {
    /**
     * The visible label of the group.
     *
     * @observable
     * @default ''
     */
    label: string;
    /**
     * Collection of the child list items inside this group.
     */
    readonly items: ListView['items'];
    /**
     * Collection of the child elements of the group.
     */
    readonly children: ViewCollection;
    /**
     * Controls whether the item view is visible. Visible by default, list items are hidden
     * using a CSS class.
     *
     * @observable
     * @default true
     */
    isVisible: boolean;
    /**
     * @inheritDoc
     */
    constructor(locale?: Locale);
    /**
     * Creates a label for the group.
     */
    private _createLabel;
    /**
     * Focuses the list item.
     */
    focus(): void;
}
