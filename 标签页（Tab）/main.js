const Tab = function (tab) {
    const self = this;
    this.tab = tab;

    // 默认配置
    this.config = {
        "triggerType": "mouseover",
        "effect": "default",
        "invoke": 1,
        "auto": false
    }

    if (this.getConfig()) {
        this.config = extend(this.config, this.getConfig());
    }
    const config = this.config;

    //保存tab标签列表、对应的内容列表
    this.tabItems = this.tab.querySelectorAll('.tab_item');
    this.contentItems = this.tab.querySelectorAll('.tab_content');

    // 事件检测与调用执行函数
    if (config.triggerType === "click") {
        this.tabItems.forEach(i => i.addEventListener("click", function () {
            self.invoke(this);
        }))
    } else if (config.triggerType === "mouseover" || config.triggerType !== "click") {
        this.tabItems.forEach(i => i.addEventListener("mouseover", function () {
            self.invoke(this);
        }))
    }

    // 自动切换功能
    if (config.auto) {
        // 定时器
        this.timer = null;
        // 计数器
        this.index = 0;
        this.autoPlay();
        // 移入移出Tab停止/恢复播放
        this.tab.addEventListener('mouseover', () => clearInterval(self.timer));
        this.tab.addEventListener('mouseleave', () => self.autoPlay());
    }

    // 默认显示Tab
    if (config.invoke > 1) {
        this.invoke(this.tabItems[config.invoke - 1]);
    }
}

Tab.prototype = {

    // 获取用户配置
    getConfig: function () {
        const config = this.tab.dataset.config;
        if (config && config != "") {
            return JSON.parse(config);
        } else {
            return null;
        }
    },

    // 事件驱动函数
    invoke: function (currentTab) {
        const self = this;
        const index = this.getNodeIndex(currentTab);
        const contentItems = this.contentItems;
        const targetContent = contentItems[index];
        const effect = this.config.effect;
        // 选中Tab
        this.tabItems.forEach(i => i.classList.remove("on"));
        currentTab.classList.add("on");

        // 切换动画
        if (effect === "default" || effect !== "fade") {
            contentItems.forEach(i => i.classList.remove("on"));
            targetContent.classList.add("on");
        } else if (effect === "fade") {
            fadeOut(this.tab.querySelector('.tab_content.on'), 300);
            fadeIn(targetContent, 300);
        }
    },

    autoPlay: function () {
        const self = this;
        const tabItems = this.tabItems;
        this.timer = setInterval(() => {
            self.index++;
            if (self.index >= tabItems.length) {
                self.index = 0;
            }
            if (self.config.triggerType === "click" || self.config.triggerType !== "mouseover") {
                tabItems[self.index].click();
            } else if (self.config.triggerType === "mouseover") {
                self.invoke(tabItems[self.index])
            }
        }, this.config.auto)
    },

    // 获取标签与内容索引
    getNodeIndex: function (elem) {
        return [...elem.parentNode.children].indexOf(elem)
    }

}

Tab.init = function (tabs) {
    const self = this;
    tabs.forEach(tab => new self(tab));
}

window.Tab = Tab;

// 初始化函数
const tabs = document.querySelectorAll('.tab');
Tab.init(tabs)