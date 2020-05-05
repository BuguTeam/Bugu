// component/movableView.js
Component({
    options: {
        addGlobalClass: true,
    },
    properties: {
    },
    methods: {
        refresh: function (e) {
            this.triggerEvent('pagerefresh')
        }
    },
})