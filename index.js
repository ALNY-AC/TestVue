// @ts-nocheck

request([
    'index.css',
]);


request([
    // 'jquery.js',
    // 'vue.js',
], function () {

    // 注册一个全局自定义指令 `v-focus`
    Vue.directive('focus', {
        inserted: function (el) {
            // 聚焦元素
            el.focus();
        }

    });

    Vue.nextTick(function () {

        $("html").animate({ opacity: '1' }, 300);
        move();
        init();

    })

    Vue.component('modal', {
        template: '#modal',
        props: ['visible', 'name', 'body', 'title', 'width', 'close'],
        watch: {
            visible: function (visible) {


            }
        },
        methods: {
            log: function (item, index) {
                console.log(item);
            },
            hide: function () {
                // this.visible = false;
                this.$emit('update:visible', false)
            },
            beforeEnter: function () {
                console.log('开始');

                document.getElementsByTagName('body') [0].style.overflow = 'hidden';
                document.getElementsByTagName('body') [0].style.paddingRight = '17px';

            },
            afterLeave: function () {
                console.log('离开');
                document.getElementsByTagName('body') [0].style.overflow = 'auto';
                document.getElementsByTagName('body') [0].style.paddingRight = '0';

            }
        }
    });

    Vue.component('number', {
        template: '#number',
        props: ['value', 'min', 'max', 'type'],
        data: function () {
            return {
                val: this.value
            };
        },
        watch: {
            val: function (val) {

                if (val == '' || val.length <= 0) {
                    return;
                }

                if (this.val > this.max) {
                    this.val = this.max;
                }
                if (this.val < this.min) {
                    this.val = this.min;
                }
                this.$emit('update:value', val);

            }
        },
        methods: {
            reduce: function () {
                //减

                if (this.val > this.min) {
                    this.val--;
                }

            },
            plus: function () {
                //增加
                if (this.val < this.max) {
                    this.val++;
                }
            }
        }
    });

    window.pageApp = new Vue({
        el: '#pageApp',
        data: {
            msg: 'asd',
            isShow: false,
            isShow2: false,
            todo: {
                text: 'Hello Word',
                isComplete: false,
                list: []
            },
            sortType: true,
            nextNum: 0,
            num: 2,
            maxLength: 10,
            count: 10,
            body: '<h1>Hello Word</h1>',
            modal: false,
            modalWidth: '30',
            user_pwd: '12138'
        },
        methods: {
            onLoadPage: function () {

                var list = [];

                for (let i = 0; i < 10; i++) {
                    list.push(i);
                    this.nextNum++;
                }

                this.todo.list = list;



            },
            randomIndex: function () {
                return Math.floor(Math.random() * this.todo.list.length)
            },
            add: function () {

                this.todo.list.splice(this.randomIndex(), 0, this.nextNum++)
            },
            remove: function (item, index) {
                this.todo.list.splice(index, 1);
            },
            del: function () {
                this.todo.list.splice(this.randomIndex(), 1);
            },
            sotr: function () {

                var a;
                this.sortType = !this.sortType;

                var sortType = this.sortType;

                var list = this.todo.list;
                this.todo.list = [];

                if (sortType) {
                    //升序
                    console.log('升序');
                    for (let i = 0; i < list.length; i++) {

                        for (let j = 0; j < list.length; j++) {

                            if (list[j] > list[j + 1]) {
                                a = list[j];
                                list[j] = list[j + 1];
                                list[j + 1] = a;
                            }

                        }
                    }
                }

                if (!sortType) {
                    //降序
                    console.log('降序');

                    for (let i = 0; i < list.length; i++) {

                        for (let j = 0; j < list.length; j++) {

                            if (list[j] < list[j + 1]) {
                                a = list[j];
                                list[j] = list[j + 1];
                                list[j + 1] = a;
                            }

                        }
                    }
                }

                console.log(list);

                this.todo.list = list;

            }
        },
        watch: {
            // 计算属性的 getter
            'todo.text': function (text) {

                var val = text;

                // `this` 指向 vm 实例
                if (val.length >= this.maxLength) {
                    this.todo.text = val.substring(0, this.maxLength);
                }

            }
        }
    });
    pageApp.onLoadPage();

});


function move() {

    // move-fk


    Move.init2('.move-fk');
    // Move.init('.move-fk');
    Move.test2('.move-fk');
    // Move.test('.move-fk');



};

var Move = {
    isD: false,

    init2: function (el) {

        let x, y;
        let top, left;


        $(document).on('mousedown', el, function (e) {


            var _touch = e;
            x = _touch.pageX;
            y = _touch.pageY;

            let offset = $(this).offset();
            left = offset.left;
            top = offset.top;
            Move.isD = true;

        });

        $(document).on('mousemove', function (e) {

            if (Move.isD) {

                var _touch = e;
                let _x = _touch.pageX;
                let _y = _touch.pageY;
                let offset = $(el).offset();

                offset = {
                    // top: top + (_y - y),
                    left: left + (_x - x),
                };

                $(el).offset(offset);
                // e.preventDefault()
                return false;
            }

        });

    },
    test2: function (el) {

        $(document).on('mouseup', function (e) {
            Move.isD = false;

            var _touch = e;
            let offset = $(el).offset();
            var left;

            if (offset.left > ($(window).width() / 2)) {
                // 过半
                // left = $(window).width() - $(el).width();
                left = '60%'

            } else {
                // 未过半
                left = 0;
            }

            $(el).animate({ left: left });


        });
    },
    init: function (el) {
        let x, y;
        let top, left;

        $(el).on('touchstart', function (e) {
            var _touch = e.originalEvent.targetTouches[0];
            x = _touch.pageX;
            y = _touch.pageY;

            let offset = $(this).offset();
            left = offset.left;
            top = offset.top;
            console.log(top);

        });

        $(el).on('touchmove', function (e) {

            var _touch = e.originalEvent.targetTouches[0];
            let _x = _touch.pageX;
            let _y = _touch.pageY;
            let offset = $(this).offset();

            offset = {
                // top: top + (_y - y),
                left: left + (_x - x),
            };

            $(this).offset(offset);


            // e.preventDefault()
            return false;
        });

    },
    test: function (el) {

        $(el).on('touchend', function (e) {

            var _touch = e.originalEvent.targetTouches[0];
            let offset = $(this).offset();
            var left;

            if (offset.left > ($(window).width() / 2)) {
                // 过半
                left = $(window).width() - $(el).width();

            } else {
                // 未过半
                left = 0;

            }

            $(el).animate({ left: left });


        });
    },

}
function init() {


    $('.show-code').on('click', function () {

        $(this).parents().find('.show-code-view').slideToggle(100);

        $(this).find('.show-icon .fa').toggleClass('fa-caret-down');
        $(this).find('.show-icon .fa').toggleClass('fa-caret-up');


        var title = $(this).find('.show-title').text();

        if (title == '展开代码') {
            title = '隐藏代码';
        } else {
            title = '展开代码';
        }

        $(this).find('.show-title').text(title);



    })


}


// var a = {
// zhihu: 0,
// name: 123,
// b: {}
// };S


// var O = function (list) {



// for (var x in list) {

// test(x, list);

// }

// }

// O(a);

// a.zhihu = 2; // set:2
// console.log(a.zhihu); // get：2

// function test(name, arr) {
// var x = name;
// var val = arr[x];

// Object.defineProperty(arr, x, {
// get: function () {
//     console.log('get：[' + x + ']' + val);
//     return val;
// },
// set: function (value) {
//     val = value;
//     console.log('set：[' + x + ']' + val);
// }
// });
// }