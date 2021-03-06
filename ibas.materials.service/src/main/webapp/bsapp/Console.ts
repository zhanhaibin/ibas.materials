/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */

import * as ibas from "ibas/index";
import { GoodsIssueFunc,} from "./goodsissue/index";
import { GoodsReceiptFunc, } from "./goodsreceipt/index";
import { InventoryTransferFunc, } from "./inventorytransfer/index";
import { MaterialInventoryFunc, } from "./materialinventory/index";
import { MaterialInventoryJournalFunc,  } from "./materialInventoryjournal/index";
import { MaterialFunc, MaterialChooseServiceMapping, MaterialLinkServiceMapping } from "./material/index";
import { MaterialGroupFunc, MaterialGroupChooseServiceMapping, MaterialGroupLinkServiceMapping } from "./materialgroup/index";
import { WarehouseFunc, WarehouseChooseServiceMapping, WarehouseLinkServiceMapping } from "./warehouse/index";

/** 模块控制台 */
export class Console extends ibas.ModuleConsole {
    /** 模块-标识 */
    static CONSOLE_ID: string = "bad47859-3d74-4b2b-975a-48c635406be4";
    /** 模块-名称 */
    static CONSOLE_NAME: string = "Materials";
    /** 构造函数 */
    constructor() {
        super();
        this.id = Console.CONSOLE_ID;
        this.name = Console.CONSOLE_NAME;
    }
    private _navigation: ibas.IViewNavigation;
    /** 创建视图导航 */
    navigation(): ibas.IViewNavigation {
        return this._navigation;
    }
    /** 初始化 */
    protected registers(): void {
        // 注册功能
        this.register(new MaterialFunc());
        this.register(new MaterialGroupFunc());
        this.register(new WarehouseFunc());
        this.register(new GoodsIssueFunc());
        this.register(new GoodsReceiptFunc());
        this.register(new InventoryTransferFunc());
        this.register(new MaterialInventoryFunc());
        this.register(new MaterialInventoryJournalFunc());
        // 注册服务应用
        this.register(new MaterialChooseServiceMapping());
        this.register(new MaterialLinkServiceMapping());
        this.register(new MaterialGroupChooseServiceMapping());
        this.register(new MaterialGroupLinkServiceMapping());
        this.register(new WarehouseChooseServiceMapping());
        this.register(new WarehouseLinkServiceMapping());
        // 注册常驻应用

    }
    /** 运行 */
    run(): void {
        // 加载语言-框架默认
        ibas.i18n.load(this.rootUrl + "resources/languages/materials.json");
        ibas.i18n.load(this.rootUrl + "resources/languages/bo/goodsissue.json");
        ibas.i18n.load(this.rootUrl + "resources/languages/bo/goodsreceipt.json");
        ibas.i18n.load(this.rootUrl + "resources/languages/bo/inventorytransfer.json");
        ibas.i18n.load(this.rootUrl + "resources/languages/bo/material.json");
        ibas.i18n.load(this.rootUrl + "resources/languages/bo/materialgroup.json");
        ibas.i18n.load(this.rootUrl + "resources/languages/bo/materialinventory.json");
        ibas.i18n.load(this.rootUrl + "resources/languages/bo/materialjournal.json");
        ibas.i18n.load(this.rootUrl + "resources/languages/bo/warehouse.json");
        // 设置资源属性
        this.description = ibas.i18n.prop(this.name.toLowerCase());
        this.icon = ibas.i18n.prop(this.name.toLowerCase() + "_icon");
        // 先加载ui导航
        let uiModules: string[] = [];
        if (!ibas.config.get(ibas.CONFIG_ITEM_DISABLE_PLATFORM_VIEW, false)
            && this.plantform === ibas.emPlantform.PHONE) {
            // 使用m类型视图
            uiModules.push("../bsui/m/Navigation");
        } else {
            // 使用c类型视图
            uiModules.push("../bsui/c/Navigation");
        }
        let that: this = this;
        require(uiModules, function (ui: any): void {
            // 设置导航
            that._navigation = new ui.default();
            // 调用初始化
            that.initialize();
        });
        // 保留基类方法
        super.run();
    }
}
