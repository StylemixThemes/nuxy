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
            var _this = this;

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

                  var group_dependency = $group.attr('data-dependency');

                  if (typeof group_dependency == 'string') {
                    group_dependency = JSON.parse(group_dependency);
                    var objKey = Object.keys(_this.data)[0];
                    var depsKey = group_dependency.key;
                    var depsDisableFields = _this.data[objKey].fields[depsKey].value[1].options;

                    if (depsDisableFields.length > 0) {
                      var dps = depsDisableFields.filter(function (dep) {
                        return dep.id === group_dependency.value;
                      });

                      if (dps.length > 0) {
                        $group.addClass('group-disabled');
                      } else {
                        $group.removeClass('group-disabled');
                      }
                    } else {
                      $group.removeClass('group-disabled');
                    }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyIkIiwiZG9jdW1lbnQiLCJyZWFkeSIsImVhY2giLCIkdGhpcyIsImRhdGFfdmFyIiwiYXR0ciIsImRhdGFfc291cmNlIiwiVnVlIiwiZWwiLCJkYXRhIiwibG9hZGluZyIsInNldHRpbmdzX2FsZXJ0Iiwic3RhdHVzIiwic3VjY2VzcyIsIm1vdW50ZWQiLCJnZXRTZXR0aW5ncyIsImNsZWFyRW1wdHlHcm91cHMiLCJtZXRob2RzIiwiaW5pdFN1Ym1lbnUiLCJuZXh0VGljayIsInRoZW4iLCJzdWJtZW51X3RhYl9maWVsZHMiLCJjc3MiLCJkaXNwbGF5IiwiJHN1Yl9tZW51Iiwic3ViX21lbnVfc2VjdGlvbiIsIiRzdWJtZW51X3NlY3Rpb24iLCJyZW1vdmVBdHRyIiwicGFyZW50cyIsImpRdWVyeSIsImNoYW5nZVRhYkZyb21BbmNob3IiLCJfdGhpcyIsImhhc2giLCJ3aW5kb3ciLCJsb2NhdGlvbiIsImhhc2hQYXJ0cyIsInNwbGl0IiwiY2hhbmdlVGFiIiwidGFiIiwiJHRhYiIsImNsb3Nlc3QiLCJmaW5kIiwicmVtb3ZlQ2xhc3MiLCJhZGRDbGFzcyIsIiRzZWN0aW9uIiwiaGlzdG9yeSIsInB1c2hTdGF0ZSIsImhhc0NsYXNzIiwiJHN1Ym1lbnUiLCJlcSIsInVybFBhcmFtcyIsIlVSTFNlYXJjaFBhcmFtcyIsInNlYXJjaCIsInN1Ym1lbnVQYXJhbSIsImdldCIsIm5hdlN1Ym1lbnUiLCJjb25jYXQiLCJ1bmRlZmluZWQiLCJsZW5ndGgiLCJjaGFuZ2VTdWJNZW51IiwiYW5pbWF0ZSIsInNjcm9sbFRvcCIsIm9mZnNldCIsInRvcCIsInN1Yl9tZW51IiwiJGh0dHAiLCJzdG1fd3BjZnRvX2FqYXh1cmwiLCJ3cGNmdG9fZ2xvYmFsX3NldHRpbmdzIiwiciIsIiRzZXQiLCJib2R5Iiwic2F2ZVNldHRpbmdzIiwiaWQiLCJ2bSIsInBvc3QiLCJzdG1fd3BjZnRvX25vbmNlcyIsIkpTT04iLCJzdHJpbmdpZnkiLCJyZXNwb25zZSIsIl9yZXNwb25zZSRib2R5Iiwic2V0VGltZW91dCIsInJlbG9hZCIsImluaXRPcGVuIiwiZmllbGQiLCJvcGVuZWQiLCJ2YWx1ZSIsIm9wZW5GaWVsZCIsImVuYWJsZUFkZG9uIiwiJGV2ZW50Iiwib3B0aW9uIiwiY3VycmVudEl0ZW0iLCJ0YXJnZXQiLCJ1cmwiLCIkY29udGFpbmVyIiwicmVtb3ZlIiwiJGdyb3VwIiwiJGNoaWxkcyIsImdyb3VwX2RlcGVuZGVuY3kiLCJwYXJzZSIsIm9iaktleSIsIk9iamVjdCIsImtleXMiLCJkZXBzS2V5Iiwia2V5IiwiZGVwc0Rpc2FibGVGaWVsZHMiLCJmaWVsZHMiLCJvcHRpb25zIiwiZHBzIiwiZmlsdGVyIiwiZGVwIiwid2F0Y2giLCJkZWVwIiwiaGFuZGxlciJdLCJzb3VyY2VzIjpbImZha2VfNzUzNWI5ZWMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbihmdW5jdGlvbiAoJCkge1xuICAkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XG4gICAgJCgnW2RhdGEtdnVlXScpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgdmFyICR0aGlzID0gJCh0aGlzKTtcbiAgICAgIHZhciBkYXRhX3ZhciA9ICR0aGlzLmF0dHIoJ2RhdGEtdnVlJyk7XG4gICAgICB2YXIgZGF0YV9zb3VyY2UgPSAkdGhpcy5hdHRyKCdkYXRhLXNvdXJjZScpO1xuICAgICAgbmV3IFZ1ZSh7XG4gICAgICAgIGVsOiAkKHRoaXMpWzBdLFxuICAgICAgICBkYXRhOiBmdW5jdGlvbiBkYXRhKCkge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBsb2FkaW5nOiBmYWxzZSxcbiAgICAgICAgICAgIGRhdGE6ICcnLFxuICAgICAgICAgICAgc2V0dGluZ3NfYWxlcnQ6IHtcbiAgICAgICAgICAgICAgc3RhdHVzOiBmYWxzZSxcbiAgICAgICAgICAgICAgc3VjY2VzczogdHJ1ZVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG4gICAgICAgIH0sXG4gICAgICAgIG1vdW50ZWQ6IGZ1bmN0aW9uIG1vdW50ZWQoKSB7XG4gICAgICAgICAgdGhpcy5nZXRTZXR0aW5ncygpO1xuICAgICAgICAgIHRoaXMuY2xlYXJFbXB0eUdyb3VwcygpO1xuICAgICAgICB9LFxuICAgICAgICBtZXRob2RzOiB7XG4gICAgICAgICAgaW5pdFN1Ym1lbnU6IGZ1bmN0aW9uIGluaXRTdWJtZW51KCkge1xuICAgICAgICAgICAgVnVlLm5leHRUaWNrKCkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgIChmdW5jdGlvbiAoJCkge1xuICAgICAgICAgICAgICAgIC8qSGlkZSBhbGwgZmllbGRzIGluIHN1Ym1lbnUqL1xuICAgICAgICAgICAgICAgIHZhciBzdWJtZW51X3RhYl9maWVsZHMgPSAkKCcud3BjZnRvLXRhYi5oYXMtc3VibWVudS1pdGVtcyBbZGF0YS1maWVsZF0sIC53cGNmdG8tdGFiLmhhcy1zdWJtZW51LWl0ZW1zIC53cGNmdG9fZ3JvdXBfc3RhcnRlZCcpO1xuICAgICAgICAgICAgICAgIHN1Ym1lbnVfdGFiX2ZpZWxkcy5jc3Moe1xuICAgICAgICAgICAgICAgICAgZGlzcGxheTogJ25vbmUnXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgdmFyICRzdWJfbWVudSA9ICQoJy53cGNmdG8tc3VibWVudXMgLmFjdGl2ZScpO1xuICAgICAgICAgICAgICAgIHZhciBzdWJfbWVudV9zZWN0aW9uID0gJHN1Yl9tZW51LmF0dHIoJ2RhdGEtc3VibWVudScpO1xuICAgICAgICAgICAgICAgIHZhciAkc3VibWVudV9zZWN0aW9uID0gJCgnLicgKyBzdWJfbWVudV9zZWN0aW9uKTtcbiAgICAgICAgICAgICAgICAkc3VibWVudV9zZWN0aW9uLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XG4gICAgICAgICAgICAgICAgc3VibWVudV90YWJfZmllbGRzLnBhcmVudHMoJy53cGNmdG9fZ3JvdXBfc3RhcnRlZCcpLmNzcyh7XG4gICAgICAgICAgICAgICAgICBkaXNwbGF5OiAnbm9uZSdcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAkc3VibWVudV9zZWN0aW9uLnBhcmVudHMoJy53cGNmdG9fZ3JvdXBfc3RhcnRlZCcpLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XG4gICAgICAgICAgICAgIH0pKGpRdWVyeSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIGNoYW5nZVRhYkZyb21BbmNob3I6IGZ1bmN0aW9uIGNoYW5nZVRhYkZyb21BbmNob3IoKSB7XG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgICAgICB2YXIgaGFzaCA9IHdpbmRvdy5sb2NhdGlvbi5oYXNoO1xuICAgICAgICAgICAgdmFyIGhhc2hQYXJ0cyA9IGhhc2guc3BsaXQoJyMnKTtcblxuICAgICAgICAgICAgaWYgKHR5cGVvZiBoYXNoUGFydHNbMV0gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgIFZ1ZS5uZXh0VGljayhmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuY2hhbmdlVGFiKGhhc2hQYXJ0c1sxXSk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgY2hhbmdlVGFiOiBmdW5jdGlvbiBjaGFuZ2VUYWIodGFiKSB7XG4gICAgICAgICAgICB2YXIgJHRhYiA9ICQoJyMnICsgdGFiKTtcbiAgICAgICAgICAgICR0YWIuY2xvc2VzdCgnLnN0bV9tZXRhYm94ZXNfZ3JpZF9faW5uZXInKS5maW5kKCcud3BjZnRvLXRhYicpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICR0YWIuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgdmFyICRzZWN0aW9uID0gJCgnZGl2W2RhdGEtc2VjdGlvbj1cIicgKyB0YWIgKyAnXCJdJyk7XG4gICAgICAgICAgICAkdGFiLmNsb3Nlc3QoJy53cGNmdG8tc2V0dGluZ3MnKS5maW5kKCcud3BjZnRvLW5hdicpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICR0YWIuY2xvc2VzdCgnLnN0bV9tZXRhYm94ZXNfZ3JpZF9faW5uZXInKS5maW5kKCcud3BjZnRvLW5hdicpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICRzZWN0aW9uLmNsb3Nlc3QoJy53cGNmdG8tbmF2JykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgaGlzdG9yeS5wdXNoU3RhdGUobnVsbCwgbnVsbCwgJyMnICsgdGFiKTtcbiAgICAgICAgICAgIC8qaWYgaGFzIHN1Ym1lbnUqL1xuXG4gICAgICAgICAgICBpZiAoJHNlY3Rpb24uY2xvc2VzdCgnLndwY2Z0by1uYXYnKS5oYXNDbGFzcygnaGFzLXN1Ym1lbnUnKSkge1xuICAgICAgICAgICAgICB2YXIgJHN1Ym1lbnUgPSAkc2VjdGlvbi5jbG9zZXN0KCcud3BjZnRvLW5hdicpLmZpbmQoJy53cGNmdG8tc3VibWVudXMgW2RhdGEtc3VibWVudV0nKS5lcSgwKTtcbiAgICAgICAgICAgICAgdmFyIHVybFBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMod2luZG93LmxvY2F0aW9uLnNlYXJjaCk7XG4gICAgICAgICAgICAgIHZhciBzdWJtZW51UGFyYW0gPSB1cmxQYXJhbXMuZ2V0KCdzdWJtZW51Jyk7XG5cbiAgICAgICAgICAgICAgaWYgKHN1Ym1lbnVQYXJhbSkge1xuICAgICAgICAgICAgICAgIHZhciBuYXZTdWJtZW51ID0gJHNlY3Rpb24uY2xvc2VzdCgnLndwY2Z0by1uYXYnKS5maW5kKFwiLndwY2Z0by1zdWJtZW51cyBbZGF0YS1zdWJtZW51PVwiLmNvbmNhdCh0YWIsIFwiX1wiKS5jb25jYXQoc3VibWVudVBhcmFtLCBcIl1cIikpO1xuICAgICAgICAgICAgICAgICRzdWJtZW51ID0gbmF2U3VibWVudSAhPT0gdW5kZWZpbmVkICYmIG5hdlN1Ym1lbnUubGVuZ3RoID4gMCA/IG5hdlN1Ym1lbnUgOiAkc3VibWVudTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIHRoaXMuY2hhbmdlU3ViTWVudSgkc3VibWVudS5hdHRyKCdkYXRhLXN1Ym1lbnUnKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvKlNjcm9sbCB0b3AqL1xuXG5cbiAgICAgICAgICAgICQoXCJodG1sLCBib2R5XCIpLmFuaW1hdGUoe1xuICAgICAgICAgICAgICBzY3JvbGxUb3A6ICR0YWIuY2xvc2VzdCgnLnN0bV9tZXRhYm94ZXNfZ3JpZF9faW5uZXInKS5vZmZzZXQoKS50b3AgLSAxMDBcbiAgICAgICAgICAgIH0sIFwiZmFzdFwiKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIGNoYW5nZVN1Yk1lbnU6IGZ1bmN0aW9uIGNoYW5nZVN1Yk1lbnUoc3ViX21lbnUpIHtcbiAgICAgICAgICAgIHZhciAkc3VibWVudSA9ICQoJ1tkYXRhLXN1Ym1lbnU9XCInICsgc3ViX21lbnUgKyAnXCJdJyk7XG4gICAgICAgICAgICAkKCdbZGF0YS1zdWJtZW51XScpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICRzdWJtZW51LmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAgIHRoaXMuaW5pdFN1Ym1lbnUoKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIGdldFNldHRpbmdzOiBmdW5jdGlvbiBnZXRTZXR0aW5ncygpIHtcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgICAgIF90aGlzLmxvYWRpbmcgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy4kaHR0cC5nZXQoc3RtX3dwY2Z0b19hamF4dXJsICsgJz9hY3Rpb249c3RtX3dwY2Z0b19nZXRfc2V0dGluZ3Mmc291cmNlPScgKyBkYXRhX3NvdXJjZSArICcmbmFtZT0nICsgZGF0YV92YXIgKyAnJm5vbmNlPScgKyB3cGNmdG9fZ2xvYmFsX3NldHRpbmdzWydub25jZSddKS50aGVuKGZ1bmN0aW9uIChyKSB7XG4gICAgICAgICAgICAgIF90aGlzLiRzZXQoX3RoaXMsICdkYXRhJywgci5ib2R5KTtcblxuICAgICAgICAgICAgICBfdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgIHRoaXMuY2hhbmdlVGFiRnJvbUFuY2hvcigpO1xuICAgICAgICAgICAgICB0aGlzLmluaXRTdWJtZW51KCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIHNhdmVTZXR0aW5nczogZnVuY3Rpb24gc2F2ZVNldHRpbmdzKGlkKSB7XG4gICAgICAgICAgICB2YXIgdm0gPSB0aGlzO1xuICAgICAgICAgICAgdm0ubG9hZGluZyA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLiRodHRwLnBvc3Qoc3RtX3dwY2Z0b19hamF4dXJsICsgJz9hY3Rpb249d3BjZnRvX3NhdmVfc2V0dGluZ3Mmbm9uY2U9JyArIHN0bV93cGNmdG9fbm9uY2VzWyd3cGNmdG9fc2F2ZV9zZXR0aW5ncyddICsgJyZuYW1lPScgKyBpZCwgSlNPTi5zdHJpbmdpZnkodm0uZGF0YSkpLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgIHZhciBfcmVzcG9uc2UkYm9keTtcblxuICAgICAgICAgICAgICB2bS5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgIHZtLnNldHRpbmdzX2FsZXJ0ID0ge1xuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IHJlc3BvbnNlLnN0YXR1cyA9PT0gMjAwLFxuICAgICAgICAgICAgICAgIHN0YXR1czogdHJ1ZVxuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2bS5zZXR0aW5nc19hbGVydC5zdGF0dXMgPSBmYWxzZTtcbiAgICAgICAgICAgICAgfSwgMTUwMCk7XG4gICAgICAgICAgICAgIGlmICgoKF9yZXNwb25zZSRib2R5ID0gcmVzcG9uc2UuYm9keSkgPT09IG51bGwgfHwgX3Jlc3BvbnNlJGJvZHkgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9yZXNwb25zZSRib2R5LnJlbG9hZCkgPT09IHRydWUpIGxvY2F0aW9uLnJlbG9hZCgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBpbml0T3BlbjogZnVuY3Rpb24gaW5pdE9wZW4oZmllbGQpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgZmllbGQub3BlbmVkID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICB0aGlzLiRzZXQoZmllbGQsICdvcGVuZWQnLCAhIWZpZWxkLnZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIG9wZW5GaWVsZDogZnVuY3Rpb24gb3BlbkZpZWxkKGZpZWxkKSB7XG4gICAgICAgICAgICB2YXIgb3BlbmVkID0gIWZpZWxkLm9wZW5lZDtcbiAgICAgICAgICAgIHRoaXMuJHNldChmaWVsZCwgJ29wZW5lZCcsIG9wZW5lZCk7XG5cbiAgICAgICAgICAgIGlmICghZmllbGQub3BlbmVkKSB7XG4gICAgICAgICAgICAgIHRoaXMuJHNldChmaWVsZCwgJ3ZhbHVlJywgJycpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgZW5hYmxlQWRkb246IGZ1bmN0aW9uIGVuYWJsZUFkZG9uKCRldmVudCwgb3B0aW9uKSB7XG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgICAgICBWdWUubmV4dFRpY2soZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAoZnVuY3Rpb24gKCQpIHtcbiAgICAgICAgICAgICAgICB2YXIgY3VycmVudEl0ZW0gPSAkKCRldmVudC50YXJnZXQpO1xuICAgICAgICAgICAgICAgIGN1cnJlbnRJdGVtLmFkZENsYXNzKCdsb2FkaW5nJyk7XG4gICAgICAgICAgICAgICAgdmFyIHVybCA9IHN0bV93cGNmdG9fYWpheHVybCArICc/YWN0aW9uPXN0bV9sbXNfZW5hYmxlX2FkZG9uJmFkZG9uPScgKyBvcHRpb247XG5cbiAgICAgICAgICAgICAgICBfdGhpcy4kaHR0cC5nZXQodXJsKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgICAgY3VycmVudEl0ZW0ucmVtb3ZlQ2xhc3MoJ2xvYWRpbmcnKTtcbiAgICAgICAgICAgICAgICAgIHZhciAkY29udGFpbmVyID0gJCgnLnN0bV9sbXNfYWRkb25fZ3JvdXBfc2V0dGluZ3NfJyArIG9wdGlvbik7XG4gICAgICAgICAgICAgICAgICAkY29udGFpbmVyLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgJHRoaXMgPSAkKHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICAkdGhpcy5yZW1vdmVDbGFzcygnaXNfcHJvIGlzX3Byb19pbl9hZGRvbicpO1xuICAgICAgICAgICAgICAgICAgICAkdGhpcy5maW5kKCcuZmllbGRfb3ZlcmxheScpLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgICAgICAkdGhpcy5maW5kKCcucHJvLW5vdGljZScpLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH0pKGpRdWVyeSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIGNsZWFyRW1wdHlHcm91cHM6IGZ1bmN0aW9uIGNsZWFyRW1wdHlHcm91cHMoKSB7XG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgICAgICBWdWUubmV4dFRpY2soKS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgKGZ1bmN0aW9uICgkKSB7XG4gICAgICAgICAgICAgICAgJCgnLndwY2Z0b19ncm91cF9zdGFydGVkJykuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICB2YXIgJGdyb3VwID0gJCh0aGlzKTtcbiAgICAgICAgICAgICAgICAgIHZhciAkY2hpbGRzID0gJGdyb3VwLmZpbmQoJy53cGNmdG8tYm94LWNoaWxkJyk7XG5cbiAgICAgICAgICAgICAgICAgIGlmICghJGNoaWxkcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgJGdyb3VwLmFkZENsYXNzKCduby1jaGlsZHMtdmlzaWJsZScpO1xuICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgJGdyb3VwLnJlbW92ZUNsYXNzKCduby1jaGlsZHMtdmlzaWJsZScpO1xuICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICB2YXIgZ3JvdXBfZGVwZW5kZW5jeSA9ICRncm91cC5hdHRyKCdkYXRhLWRlcGVuZGVuY3knKTtcblxuICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBncm91cF9kZXBlbmRlbmN5ID09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgIGdyb3VwX2RlcGVuZGVuY3kgPSBKU09OLnBhcnNlKGdyb3VwX2RlcGVuZGVuY3kpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgb2JqS2V5ID0gT2JqZWN0LmtleXMoX3RoaXMuZGF0YSlbMF07XG4gICAgICAgICAgICAgICAgICAgIHZhciBkZXBzS2V5ID0gZ3JvdXBfZGVwZW5kZW5jeS5rZXk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBkZXBzRGlzYWJsZUZpZWxkcyA9IF90aGlzLmRhdGFbb2JqS2V5XS5maWVsZHNbZGVwc0tleV0udmFsdWVbMV0ub3B0aW9ucztcblxuICAgICAgICAgICAgICAgICAgICBpZiAoZGVwc0Rpc2FibGVGaWVsZHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgIHZhciBkcHMgPSBkZXBzRGlzYWJsZUZpZWxkcy5maWx0ZXIoZnVuY3Rpb24gKGRlcCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlcC5pZCA9PT0gZ3JvdXBfZGVwZW5kZW5jeS52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgIGlmIChkcHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgJGdyb3VwLmFkZENsYXNzKCdncm91cC1kaXNhYmxlZCcpO1xuICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkZ3JvdXAucmVtb3ZlQ2xhc3MoJ2dyb3VwLWRpc2FibGVkJyk7XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICRncm91cC5yZW1vdmVDbGFzcygnZ3JvdXAtZGlzYWJsZWQnKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB9KShqUXVlcnkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB3YXRjaDoge1xuICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIGRlZXA6IHRydWUsXG4gICAgICAgICAgICBoYW5kbGVyOiBmdW5jdGlvbiBoYW5kbGVyKCkge1xuICAgICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIF90aGlzLmNsZWFyRW1wdHlHcm91cHMoKTtcblxuICAgICAgICAgICAgICAgIF90aGlzLmluaXRTdWJtZW51KCk7XG4gICAgICAgICAgICAgIH0sIDEwMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG59KShqUXVlcnkpOyJdLCJtYXBwaW5ncyI6IkFBQUE7O0FBRUEsQ0FBQyxVQUFVQSxDQUFWLEVBQWE7RUFDWkEsQ0FB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
},{}]},{},[1])