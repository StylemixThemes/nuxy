(function ($) {
    $(document).ready(function () {

        $('[data-vue]').each(function () {

            let $this = $(this);

            let data_var = $this.attr('data-vue');
            let data_source = $this.attr('data-source');

            new Vue({
                el: $(this)[0],
                data: function () {
                    return {
                        loading: false,
                        data: '',
                    }
                },
                mounted: function () {
                    this.getSettings();
                    this.clearEmptyGroups();
                },
                methods: {
                    initSubmenu: function () {
                        Vue.nextTick()
                            .then(function () {
                                (function ($) {

                                    /*Hide all fields in submenu*/
                                    var submenu_tab_fields = $('.wpcfto-tab.has-submenu-items [data-field], .wpcfto-tab.has-submenu-items .wpcfto_group_started');
                                    submenu_tab_fields.css({
                                        display: 'none'
                                    });

                                    var $sub_menu = $('.wpcfto-submenus .active');
                                    var sub_menu_section = $sub_menu.attr('data-submenu');
                                    let $submenu_section = $('.' + sub_menu_section);

                                    $submenu_section.removeAttr('style');


                                    submenu_tab_fields.parents('.wpcfto_group_started').css({
                                        display: 'none'
                                    });

                                    $submenu_section.parents('.wpcfto_group_started').removeAttr('style');

                                })(jQuery);
                            });
                    },
                    changeTabFromAnchor: function () {
                        var _this = this;
                        var hash = window.location.hash;
                        var hashParts = hash.split('#');
                        if (typeof hashParts[1] !== 'undefined') {
                            Vue.nextTick(function () {
                                _this.changeTab(hashParts[1]);
                            });
                        }
                    },
                    changeTab: function (tab) {
                        let $tab = $('#' + tab);
                        $tab.closest('.stm_metaboxes_grid__inner').find('.wpcfto-tab').removeClass('active');
                        $tab.addClass('active');

                        let $section = $('div[data-section="' + tab + '"]');
                        $tab.closest('.stm_metaboxes_grid__inner').find('.wpcfto-nav').removeClass('active');
                        $section.closest('.wpcfto-nav').addClass('active');

                        history.pushState(null, null, '#' + tab);

                        /*if has submenu*/
                        if ($section.closest('.wpcfto-nav').hasClass('has-submenu')) {
                            var $submenu = $section.closest('.wpcfto-nav').find('.wpcfto-submenus [data-submenu]').eq(0);
                            this.changeSubMenu($submenu.attr('data-submenu'));
                        }

                        /*Scroll top*/
                        $("html, body").animate(
                            {
                                scrollTop: $tab.closest('.stm_metaboxes_grid__inner').offset().top - 100
                            },
                            "fast");

                    },
                    changeSubMenu(sub_menu) {
                        let $submenu = $('[data-submenu="' + sub_menu + '"]');
                        $('[data-submenu]').removeClass('active');
                        $submenu.addClass('active');
                        this.initSubmenu();
                    },
                    getSettings: function () {
                        var _this = this;
                        _this.loading = true;

                        this.$http.get(stm_wpcfto_ajaxurl + '?action=stm_wpcfto_get_settings&source=' + data_source + '&name=' + data_var).then(function (r) {
                            _this.$set(_this, 'data', r.body);
                            _this.loading = false;

                            this.changeTabFromAnchor();

                            this.initSubmenu();
                        });

                    },
                    saveSettings: function (id) {
                        var vm = this;
                        vm.loading = true;
                        this.$http.post(stm_wpcfto_ajaxurl + '?action=wpcfto_save_settings&nonce=' + stm_wpcfto_nonces['wpcfto_save_settings'] + '&name=' + id, JSON.stringify(vm.data)).then(function (response) {
                            vm.loading = false;

                            if(response.body?.reload === true) location.reload();
                        });
                    },
                    initOpen(field) {
                        if (typeof field.opened === 'undefined') {
                            this.$set(field, 'opened', !!(field.value));
                        }
                    },
                    openField(field) {

                        var opened = !field.opened;


                        this.$set(field, 'opened', opened);

                        if (!field.opened) {
                            this.$set(field, 'value', '');
                        }
                    },
                    enableAddon($event, option) {
                        var _this = this;
                        Vue.nextTick(function () {
                            (function ($) {

                                var currentItem = $($event.target);

                                currentItem.addClass('loading');

                                var url = stm_wpcfto_ajaxurl + '?action=stm_lms_enable_addon&addon=' + option;

                                _this.$http.get(url).then(function (response) {
                                    currentItem.removeClass('loading');
                                    var $container = $('.stm_lms_addon_group_settings_' + option);
                                    $container.each(function () {
                                        var $this = $(this);
                                        $this.removeClass('is_pro is_pro_in_addon');
                                        $this.find('.field_overlay').remove();
                                        $this.find('.pro-notice').remove();
                                    });
                                });

                            })(jQuery);
                        });
                    },
                    clearEmptyGroups() {
                        Vue.nextTick()
                            .then(function () {
                                (function ($) {
                                    $('.wpcfto_group_started').each(function () {
                                        let $group = $(this);
                                        let $childs = $group.find('.wpcfto-box-child');
                                        if (!$childs.length) {
                                            $group.addClass('no-childs-visible');
                                        } else {
                                            $group.removeClass('no-childs-visible');
                                        }
                                    })
                                })(jQuery);
                            });
                    }
                },
                watch: {
                    data: {
                        deep: true,
                        handler: function () {
                            let _this = this;
                            setTimeout(function () {
                                _this.clearEmptyGroups();
                                _this.initSubmenu();
                            }, 100);
                        }
                    }
                }
            });

        });

    });
})(jQuery);
