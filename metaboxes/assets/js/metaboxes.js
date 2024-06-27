(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

(function ($) {
  $(document).ready(function () {
    $('[data-vue]').each(function () {
      var $this = $(this);
      var data_var = $this.attr('data-vue');
      var data_source = $this.attr('data-source');
      new Vue({
        el: $(this)[0],
        data: function data() {
          return {
            loading: false,
            data: '',
            settings_alert: {
              status: false,
              success: true
            }
          };
        },
        mounted: function mounted() {
          this.getSettings();
          this.clearEmptyGroups();
        },
        methods: {
          initSubmenu: function initSubmenu() {
            Vue.nextTick().then(function () {
              (function ($) {
                /*Hide all fields in submenu*/
                var submenu_tab_fields = $('.wpcfto-tab.has-submenu-items [data-field], .wpcfto-tab.has-submenu-items .wpcfto_group_started');
                submenu_tab_fields.css({
                  display: 'none'
                });
                var $sub_menu = $('.wpcfto-submenus .active');
                var sub_menu_section = $sub_menu.attr('data-submenu');
                var $submenu_section = $('.' + sub_menu_section);
                $submenu_section.removeAttr('style');
                submenu_tab_fields.parents('.wpcfto_group_started').css({
                  display: 'none'
                });
                $submenu_section.parents('.wpcfto_group_started').removeAttr('style');
              })(jQuery);
            });
          },
          changeTabFromAnchor: function changeTabFromAnchor() {
            var _this = this;

            var hash = window.location.hash;
            var hashParts = hash.split('#');

            if (typeof hashParts[1] !== 'undefined') {
              Vue.nextTick(function () {
                _this.changeTab(hashParts[1]);
              });
            }
          },
          changeTab: function changeTab(tab) {
            var $tab = $('#' + tab);
            $tab.closest('.stm_metaboxes_grid__inner').find('.wpcfto-tab').removeClass('active');
            $tab.addClass('active');
            var $section = $('div[data-section="' + tab + '"]');
            $tab.closest('.wpcfto-settings').find('.wpcfto-nav').removeClass('active');
            $tab.closest('.stm_metaboxes_grid__inner').find('.wpcfto-nav').removeClass('active');
            $section.closest('.wpcfto-nav').addClass('active');
            history.pushState(null, null, '#' + tab);
            /*if has submenu*/

            if ($section.closest('.wpcfto-nav').hasClass('has-submenu')) {
              var $submenu = $section.closest('.wpcfto-nav').find('.wpcfto-submenus [data-submenu]').eq(0);
              var urlParams = new URLSearchParams(window.location.search);
              var submenuParam = urlParams.get('submenu');

              if (submenuParam) {
                var navSubmenu = $section.closest('.wpcfto-nav').find(".wpcfto-submenus [data-submenu=".concat(tab, "_").concat(submenuParam, "]"));
                $submenu = navSubmenu !== undefined && navSubmenu.length > 0 ? navSubmenu : $submenu;
              }

              this.changeSubMenu($submenu.attr('data-submenu'));
            }
            /*Scroll top*/


            $("html, body").animate({
              scrollTop: $tab.closest('.stm_metaboxes_grid__inner').offset().top - 100
            }, "fast");
          },
          changeSubMenu: function changeSubMenu(sub_menu) {
            var $submenu = $('[data-submenu="' + sub_menu + '"]');
            $('[data-submenu]').removeClass('active');
            $submenu.addClass('active');
            this.initSubmenu();
          },
          getSettings: function getSettings() {
            var _this = this;

            _this.loading = true;
            this.$http.get(stm_wpcfto_ajaxurl + '?action=stm_wpcfto_get_settings&source=' + data_source + '&name=' + data_var + '&nonce=' + wpcfto_global_settings['nonce']).then(function (r) {
              _this.$set(_this, 'data', r.body);

              _this.loading = false;
              this.changeTabFromAnchor();
              this.initSubmenu();
            });
          },
          saveSettings: function saveSettings(id) {
            var vm = this;
            vm.loading = true;
            this.$http.post(stm_wpcfto_ajaxurl + '?action=wpcfto_save_settings&nonce=' + stm_wpcfto_nonces['wpcfto_save_settings'] + '&name=' + id, JSON.stringify(vm.data)).then(function (response) {
              var _response$body;

              vm.loading = false;
              vm.settings_alert = {
                success: response.status === 200,
                status: true
              };
              setTimeout(function () {
                vm.settings_alert.status = false;
              }, 1500);
              if (((_response$body = response.body) === null || _response$body === void 0 ? void 0 : _response$body.reload) === true) location.reload();
            });
          },
          initOpen: function initOpen(field) {
            if (typeof field.opened === 'undefined') {
              this.$set(field, 'opened', !!field.value);
            }
          },
          openField: function openField(field) {
            var opened = !field.opened;
            this.$set(field, 'opened', opened);

            if (!field.opened) {
              this.$set(field, 'value', '');
            }
          },
          enableAddon: function enableAddon($event, option) {
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
          clearEmptyGroups: function clearEmptyGroups() {
            Vue.nextTick().then(function () {
              (function ($) {
                $('.wpcfto_group_started').each(function () {
                  var $group = $(this);
                  var $childs = $group.find('.wpcfto-box-child');

                  if (!$childs.length) {
                    $group.addClass('no-childs-visible');
                  } else {
                    $group.removeClass('no-childs-visible');
                  }
                });
              })(jQuery);
            });
          }
        },
        watch: {
          data: {
            deep: true,
            handler: function handler() {
              var _this = this;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyIkIiwiZG9jdW1lbnQiLCJyZWFkeSIsImVhY2giLCIkdGhpcyIsImRhdGFfdmFyIiwiYXR0ciIsImRhdGFfc291cmNlIiwiVnVlIiwiZWwiLCJkYXRhIiwibG9hZGluZyIsInNldHRpbmdzX2FsZXJ0Iiwic3RhdHVzIiwic3VjY2VzcyIsIm1vdW50ZWQiLCJnZXRTZXR0aW5ncyIsImNsZWFyRW1wdHlHcm91cHMiLCJtZXRob2RzIiwiaW5pdFN1Ym1lbnUiLCJuZXh0VGljayIsInRoZW4iLCJzdWJtZW51X3RhYl9maWVsZHMiLCJjc3MiLCJkaXNwbGF5IiwiJHN1Yl9tZW51Iiwic3ViX21lbnVfc2VjdGlvbiIsIiRzdWJtZW51X3NlY3Rpb24iLCJyZW1vdmVBdHRyIiwicGFyZW50cyIsImpRdWVyeSIsImNoYW5nZVRhYkZyb21BbmNob3IiLCJfdGhpcyIsImhhc2giLCJ3aW5kb3ciLCJsb2NhdGlvbiIsImhhc2hQYXJ0cyIsInNwbGl0IiwiY2hhbmdlVGFiIiwidGFiIiwiJHRhYiIsImNsb3Nlc3QiLCJmaW5kIiwicmVtb3ZlQ2xhc3MiLCJhZGRDbGFzcyIsIiRzZWN0aW9uIiwiaGlzdG9yeSIsInB1c2hTdGF0ZSIsImhhc0NsYXNzIiwiJHN1Ym1lbnUiLCJlcSIsInVybFBhcmFtcyIsIlVSTFNlYXJjaFBhcmFtcyIsInNlYXJjaCIsInN1Ym1lbnVQYXJhbSIsImdldCIsIm5hdlN1Ym1lbnUiLCJjb25jYXQiLCJ1bmRlZmluZWQiLCJsZW5ndGgiLCJjaGFuZ2VTdWJNZW51IiwiYW5pbWF0ZSIsInNjcm9sbFRvcCIsIm9mZnNldCIsInRvcCIsInN1Yl9tZW51IiwiJGh0dHAiLCJzdG1fd3BjZnRvX2FqYXh1cmwiLCJ3cGNmdG9fZ2xvYmFsX3NldHRpbmdzIiwiciIsIiRzZXQiLCJib2R5Iiwic2F2ZVNldHRpbmdzIiwiaWQiLCJ2bSIsInBvc3QiLCJzdG1fd3BjZnRvX25vbmNlcyIsIkpTT04iLCJzdHJpbmdpZnkiLCJyZXNwb25zZSIsIl9yZXNwb25zZSRib2R5Iiwic2V0VGltZW91dCIsInJlbG9hZCIsImluaXRPcGVuIiwiZmllbGQiLCJvcGVuZWQiLCJ2YWx1ZSIsIm9wZW5GaWVsZCIsImVuYWJsZUFkZG9uIiwiJGV2ZW50Iiwib3B0aW9uIiwiY3VycmVudEl0ZW0iLCJ0YXJnZXQiLCJ1cmwiLCIkY29udGFpbmVyIiwicmVtb3ZlIiwiJGdyb3VwIiwiJGNoaWxkcyIsIndhdGNoIiwiZGVlcCIsImhhbmRsZXIiXSwic291cmNlcyI6WyJmYWtlXzMwNjNhYzRhLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG4oZnVuY3Rpb24gKCQpIHtcbiAgJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xuICAgICQoJ1tkYXRhLXZ1ZV0nKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciAkdGhpcyA9ICQodGhpcyk7XG4gICAgICB2YXIgZGF0YV92YXIgPSAkdGhpcy5hdHRyKCdkYXRhLXZ1ZScpO1xuICAgICAgdmFyIGRhdGFfc291cmNlID0gJHRoaXMuYXR0cignZGF0YS1zb3VyY2UnKTtcbiAgICAgIG5ldyBWdWUoe1xuICAgICAgICBlbDogJCh0aGlzKVswXSxcbiAgICAgICAgZGF0YTogZnVuY3Rpb24gZGF0YSgpIHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbG9hZGluZzogZmFsc2UsXG4gICAgICAgICAgICBkYXRhOiAnJyxcbiAgICAgICAgICAgIHNldHRpbmdzX2FsZXJ0OiB7XG4gICAgICAgICAgICAgIHN0YXR1czogZmFsc2UsXG4gICAgICAgICAgICAgIHN1Y2Nlc3M6IHRydWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9O1xuICAgICAgICB9LFxuICAgICAgICBtb3VudGVkOiBmdW5jdGlvbiBtb3VudGVkKCkge1xuICAgICAgICAgIHRoaXMuZ2V0U2V0dGluZ3MoKTtcbiAgICAgICAgICB0aGlzLmNsZWFyRW1wdHlHcm91cHMoKTtcbiAgICAgICAgfSxcbiAgICAgICAgbWV0aG9kczoge1xuICAgICAgICAgIGluaXRTdWJtZW51OiBmdW5jdGlvbiBpbml0U3VibWVudSgpIHtcbiAgICAgICAgICAgIFZ1ZS5uZXh0VGljaygpLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAoZnVuY3Rpb24gKCQpIHtcbiAgICAgICAgICAgICAgICAvKkhpZGUgYWxsIGZpZWxkcyBpbiBzdWJtZW51Ki9cbiAgICAgICAgICAgICAgICB2YXIgc3VibWVudV90YWJfZmllbGRzID0gJCgnLndwY2Z0by10YWIuaGFzLXN1Ym1lbnUtaXRlbXMgW2RhdGEtZmllbGRdLCAud3BjZnRvLXRhYi5oYXMtc3VibWVudS1pdGVtcyAud3BjZnRvX2dyb3VwX3N0YXJ0ZWQnKTtcbiAgICAgICAgICAgICAgICBzdWJtZW51X3RhYl9maWVsZHMuY3NzKHtcbiAgICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdub25lJ1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHZhciAkc3ViX21lbnUgPSAkKCcud3BjZnRvLXN1Ym1lbnVzIC5hY3RpdmUnKTtcbiAgICAgICAgICAgICAgICB2YXIgc3ViX21lbnVfc2VjdGlvbiA9ICRzdWJfbWVudS5hdHRyKCdkYXRhLXN1Ym1lbnUnKTtcbiAgICAgICAgICAgICAgICB2YXIgJHN1Ym1lbnVfc2VjdGlvbiA9ICQoJy4nICsgc3ViX21lbnVfc2VjdGlvbik7XG4gICAgICAgICAgICAgICAgJHN1Ym1lbnVfc2VjdGlvbi5yZW1vdmVBdHRyKCdzdHlsZScpO1xuICAgICAgICAgICAgICAgIHN1Ym1lbnVfdGFiX2ZpZWxkcy5wYXJlbnRzKCcud3BjZnRvX2dyb3VwX3N0YXJ0ZWQnKS5jc3Moe1xuICAgICAgICAgICAgICAgICAgZGlzcGxheTogJ25vbmUnXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgJHN1Ym1lbnVfc2VjdGlvbi5wYXJlbnRzKCcud3BjZnRvX2dyb3VwX3N0YXJ0ZWQnKS5yZW1vdmVBdHRyKCdzdHlsZScpO1xuICAgICAgICAgICAgICB9KShqUXVlcnkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBjaGFuZ2VUYWJGcm9tQW5jaG9yOiBmdW5jdGlvbiBjaGFuZ2VUYWJGcm9tQW5jaG9yKCkge1xuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgICAgICAgICAgdmFyIGhhc2ggPSB3aW5kb3cubG9jYXRpb24uaGFzaDtcbiAgICAgICAgICAgIHZhciBoYXNoUGFydHMgPSBoYXNoLnNwbGl0KCcjJyk7XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgaGFzaFBhcnRzWzFdICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICBWdWUubmV4dFRpY2soZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIF90aGlzLmNoYW5nZVRhYihoYXNoUGFydHNbMV0pO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIGNoYW5nZVRhYjogZnVuY3Rpb24gY2hhbmdlVGFiKHRhYikge1xuICAgICAgICAgICAgdmFyICR0YWIgPSAkKCcjJyArIHRhYik7XG4gICAgICAgICAgICAkdGFiLmNsb3Nlc3QoJy5zdG1fbWV0YWJveGVzX2dyaWRfX2lubmVyJykuZmluZCgnLndwY2Z0by10YWInKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICAgICAkdGFiLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAgIHZhciAkc2VjdGlvbiA9ICQoJ2RpdltkYXRhLXNlY3Rpb249XCInICsgdGFiICsgJ1wiXScpO1xuICAgICAgICAgICAgJHRhYi5jbG9zZXN0KCcud3BjZnRvLXNldHRpbmdzJykuZmluZCgnLndwY2Z0by1uYXYnKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICAgICAkdGFiLmNsb3Nlc3QoJy5zdG1fbWV0YWJveGVzX2dyaWRfX2lubmVyJykuZmluZCgnLndwY2Z0by1uYXYnKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICAgICAkc2VjdGlvbi5jbG9zZXN0KCcud3BjZnRvLW5hdicpLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAgIGhpc3RvcnkucHVzaFN0YXRlKG51bGwsIG51bGwsICcjJyArIHRhYik7XG4gICAgICAgICAgICAvKmlmIGhhcyBzdWJtZW51Ki9cblxuICAgICAgICAgICAgaWYgKCRzZWN0aW9uLmNsb3Nlc3QoJy53cGNmdG8tbmF2JykuaGFzQ2xhc3MoJ2hhcy1zdWJtZW51JykpIHtcbiAgICAgICAgICAgICAgdmFyICRzdWJtZW51ID0gJHNlY3Rpb24uY2xvc2VzdCgnLndwY2Z0by1uYXYnKS5maW5kKCcud3BjZnRvLXN1Ym1lbnVzIFtkYXRhLXN1Ym1lbnVdJykuZXEoMCk7XG4gICAgICAgICAgICAgIHZhciB1cmxQYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHdpbmRvdy5sb2NhdGlvbi5zZWFyY2gpO1xuICAgICAgICAgICAgICB2YXIgc3VibWVudVBhcmFtID0gdXJsUGFyYW1zLmdldCgnc3VibWVudScpO1xuXG4gICAgICAgICAgICAgIGlmIChzdWJtZW51UGFyYW0pIHtcbiAgICAgICAgICAgICAgICB2YXIgbmF2U3VibWVudSA9ICRzZWN0aW9uLmNsb3Nlc3QoJy53cGNmdG8tbmF2JykuZmluZChcIi53cGNmdG8tc3VibWVudXMgW2RhdGEtc3VibWVudT1cIi5jb25jYXQodGFiLCBcIl9cIikuY29uY2F0KHN1Ym1lbnVQYXJhbSwgXCJdXCIpKTtcbiAgICAgICAgICAgICAgICAkc3VibWVudSA9IG5hdlN1Ym1lbnUgIT09IHVuZGVmaW5lZCAmJiBuYXZTdWJtZW51Lmxlbmd0aCA+IDAgPyBuYXZTdWJtZW51IDogJHN1Ym1lbnU7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICB0aGlzLmNoYW5nZVN1Yk1lbnUoJHN1Ym1lbnUuYXR0cignZGF0YS1zdWJtZW51JykpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLypTY3JvbGwgdG9wKi9cblxuXG4gICAgICAgICAgICAkKFwiaHRtbCwgYm9keVwiKS5hbmltYXRlKHtcbiAgICAgICAgICAgICAgc2Nyb2xsVG9wOiAkdGFiLmNsb3Nlc3QoJy5zdG1fbWV0YWJveGVzX2dyaWRfX2lubmVyJykub2Zmc2V0KCkudG9wIC0gMTAwXG4gICAgICAgICAgICB9LCBcImZhc3RcIik7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBjaGFuZ2VTdWJNZW51OiBmdW5jdGlvbiBjaGFuZ2VTdWJNZW51KHN1Yl9tZW51KSB7XG4gICAgICAgICAgICB2YXIgJHN1Ym1lbnUgPSAkKCdbZGF0YS1zdWJtZW51PVwiJyArIHN1Yl9tZW51ICsgJ1wiXScpO1xuICAgICAgICAgICAgJCgnW2RhdGEtc3VibWVudV0nKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICAgICAkc3VibWVudS5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICAgICB0aGlzLmluaXRTdWJtZW51KCk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBnZXRTZXR0aW5nczogZnVuY3Rpb24gZ2V0U2V0dGluZ3MoKSB7XG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgICAgICBfdGhpcy5sb2FkaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuJGh0dHAuZ2V0KHN0bV93cGNmdG9fYWpheHVybCArICc/YWN0aW9uPXN0bV93cGNmdG9fZ2V0X3NldHRpbmdzJnNvdXJjZT0nICsgZGF0YV9zb3VyY2UgKyAnJm5hbWU9JyArIGRhdGFfdmFyICsgJyZub25jZT0nICsgd3BjZnRvX2dsb2JhbF9zZXR0aW5nc1snbm9uY2UnXSkudGhlbihmdW5jdGlvbiAocikge1xuICAgICAgICAgICAgICBfdGhpcy4kc2V0KF90aGlzLCAnZGF0YScsIHIuYm9keSk7XG5cbiAgICAgICAgICAgICAgX3RoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICB0aGlzLmNoYW5nZVRhYkZyb21BbmNob3IoKTtcbiAgICAgICAgICAgICAgdGhpcy5pbml0U3VibWVudSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBzYXZlU2V0dGluZ3M6IGZ1bmN0aW9uIHNhdmVTZXR0aW5ncyhpZCkge1xuICAgICAgICAgICAgdmFyIHZtID0gdGhpcztcbiAgICAgICAgICAgIHZtLmxvYWRpbmcgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy4kaHR0cC5wb3N0KHN0bV93cGNmdG9fYWpheHVybCArICc/YWN0aW9uPXdwY2Z0b19zYXZlX3NldHRpbmdzJm5vbmNlPScgKyBzdG1fd3BjZnRvX25vbmNlc1snd3BjZnRvX3NhdmVfc2V0dGluZ3MnXSArICcmbmFtZT0nICsgaWQsIEpTT04uc3RyaW5naWZ5KHZtLmRhdGEpKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICB2YXIgX3Jlc3BvbnNlJGJvZHk7XG5cbiAgICAgICAgICAgICAgdm0ubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICB2bS5zZXR0aW5nc19hbGVydCA9IHtcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiByZXNwb25zZS5zdGF0dXMgPT09IDIwMCxcbiAgICAgICAgICAgICAgICBzdGF0dXM6IHRydWVcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdm0uc2V0dGluZ3NfYWxlcnQuc3RhdHVzID0gZmFsc2U7XG4gICAgICAgICAgICAgIH0sIDE1MDApO1xuICAgICAgICAgICAgICBpZiAoKChfcmVzcG9uc2UkYm9keSA9IHJlc3BvbnNlLmJvZHkpID09PSBudWxsIHx8IF9yZXNwb25zZSRib2R5ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfcmVzcG9uc2UkYm9keS5yZWxvYWQpID09PSB0cnVlKSBsb2NhdGlvbi5yZWxvYWQoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgaW5pdE9wZW46IGZ1bmN0aW9uIGluaXRPcGVuKGZpZWxkKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGZpZWxkLm9wZW5lZCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgdGhpcy4kc2V0KGZpZWxkLCAnb3BlbmVkJywgISFmaWVsZC52YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICBvcGVuRmllbGQ6IGZ1bmN0aW9uIG9wZW5GaWVsZChmaWVsZCkge1xuICAgICAgICAgICAgdmFyIG9wZW5lZCA9ICFmaWVsZC5vcGVuZWQ7XG4gICAgICAgICAgICB0aGlzLiRzZXQoZmllbGQsICdvcGVuZWQnLCBvcGVuZWQpO1xuXG4gICAgICAgICAgICBpZiAoIWZpZWxkLm9wZW5lZCkge1xuICAgICAgICAgICAgICB0aGlzLiRzZXQoZmllbGQsICd2YWx1ZScsICcnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIGVuYWJsZUFkZG9uOiBmdW5jdGlvbiBlbmFibGVBZGRvbigkZXZlbnQsIG9wdGlvbikge1xuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgICAgICAgICAgVnVlLm5leHRUaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgKGZ1bmN0aW9uICgkKSB7XG4gICAgICAgICAgICAgICAgdmFyIGN1cnJlbnRJdGVtID0gJCgkZXZlbnQudGFyZ2V0KTtcbiAgICAgICAgICAgICAgICBjdXJyZW50SXRlbS5hZGRDbGFzcygnbG9hZGluZycpO1xuICAgICAgICAgICAgICAgIHZhciB1cmwgPSBzdG1fd3BjZnRvX2FqYXh1cmwgKyAnP2FjdGlvbj1zdG1fbG1zX2VuYWJsZV9hZGRvbiZhZGRvbj0nICsgb3B0aW9uO1xuXG4gICAgICAgICAgICAgICAgX3RoaXMuJGh0dHAuZ2V0KHVybCkudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICAgIGN1cnJlbnRJdGVtLnJlbW92ZUNsYXNzKCdsb2FkaW5nJyk7XG4gICAgICAgICAgICAgICAgICB2YXIgJGNvbnRhaW5lciA9ICQoJy5zdG1fbG1zX2FkZG9uX2dyb3VwX3NldHRpbmdzXycgKyBvcHRpb24pO1xuICAgICAgICAgICAgICAgICAgJGNvbnRhaW5lci5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyICR0aGlzID0gJCh0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgJHRoaXMucmVtb3ZlQ2xhc3MoJ2lzX3BybyBpc19wcm9faW5fYWRkb24nKTtcbiAgICAgICAgICAgICAgICAgICAgJHRoaXMuZmluZCgnLmZpZWxkX292ZXJsYXknKS5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgJHRoaXMuZmluZCgnLnByby1ub3RpY2UnKS5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB9KShqUXVlcnkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBjbGVhckVtcHR5R3JvdXBzOiBmdW5jdGlvbiBjbGVhckVtcHR5R3JvdXBzKCkge1xuICAgICAgICAgICAgVnVlLm5leHRUaWNrKCkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgIChmdW5jdGlvbiAoJCkge1xuICAgICAgICAgICAgICAgICQoJy53cGNmdG9fZ3JvdXBfc3RhcnRlZCcpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgdmFyICRncm91cCA9ICQodGhpcyk7XG4gICAgICAgICAgICAgICAgICB2YXIgJGNoaWxkcyA9ICRncm91cC5maW5kKCcud3BjZnRvLWJveC1jaGlsZCcpO1xuXG4gICAgICAgICAgICAgICAgICBpZiAoISRjaGlsZHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICRncm91cC5hZGRDbGFzcygnbm8tY2hpbGRzLXZpc2libGUnKTtcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICRncm91cC5yZW1vdmVDbGFzcygnbm8tY2hpbGRzLXZpc2libGUnKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfSkoalF1ZXJ5KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgd2F0Y2g6IHtcbiAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICBkZWVwOiB0cnVlLFxuICAgICAgICAgICAgaGFuZGxlcjogZnVuY3Rpb24gaGFuZGxlcigpIHtcbiAgICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5jbGVhckVtcHR5R3JvdXBzKCk7XG5cbiAgICAgICAgICAgICAgICBfdGhpcy5pbml0U3VibWVudSgpO1xuICAgICAgICAgICAgICB9LCAxMDApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xufSkoalF1ZXJ5KTsiXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBLENBQUMsVUFBVUEsQ0FBVixFQUFhO0VBQ1pBLENBQUMsQ0FBQ0MsUUFBRCxDQUFELENBQVlDLEtBQVosQ0FBa0IsWUFBWTtJQUM1QkYsQ0FBQyxDQUFDLFlBQUQsQ0FBRCxDQUFnQkcsSUFBaEIsQ0FBcUIsWUFBWTtNQUMvQixJQUFJQyxLQUFLLEdBQUdKLENBQUMsQ0FBQyxJQUFELENBQWI7TUFDQSxJQUFJSyxRQUFRLEdBQUdELEtBQUssQ0FBQ0UsSUFBTixDQUFXLFVBQVgsQ0FBZjtNQUNBLElBQUlDLFdBQVcsR0FBR0gsS0FBSyxDQUFDRSxJQUFOLENBQVcsYUFBWCxDQUFsQjtNQUNBLElBQUlFLEdBQUosQ0FBUTtRQUNOQyxFQUFFLEVBQUVU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
},{}]},{},[1])