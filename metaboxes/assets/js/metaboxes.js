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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyIkIiwiZG9jdW1lbnQiLCJyZWFkeSIsImVhY2giLCIkdGhpcyIsImRhdGFfdmFyIiwiYXR0ciIsImRhdGFfc291cmNlIiwiVnVlIiwiZWwiLCJkYXRhIiwibG9hZGluZyIsInNldHRpbmdzX2FsZXJ0Iiwic3RhdHVzIiwic3VjY2VzcyIsIm1vdW50ZWQiLCJnZXRTZXR0aW5ncyIsImNsZWFyRW1wdHlHcm91cHMiLCJtZXRob2RzIiwiaW5pdFN1Ym1lbnUiLCJuZXh0VGljayIsInRoZW4iLCJzdWJtZW51X3RhYl9maWVsZHMiLCJjc3MiLCJkaXNwbGF5IiwiJHN1Yl9tZW51Iiwic3ViX21lbnVfc2VjdGlvbiIsIiRzdWJtZW51X3NlY3Rpb24iLCJyZW1vdmVBdHRyIiwicGFyZW50cyIsImpRdWVyeSIsImNoYW5nZVRhYkZyb21BbmNob3IiLCJfdGhpcyIsImhhc2giLCJ3aW5kb3ciLCJsb2NhdGlvbiIsImhhc2hQYXJ0cyIsInNwbGl0IiwiY2hhbmdlVGFiIiwidGFiIiwiJHRhYiIsImNsb3Nlc3QiLCJmaW5kIiwicmVtb3ZlQ2xhc3MiLCJhZGRDbGFzcyIsIiRzZWN0aW9uIiwiaGlzdG9yeSIsInB1c2hTdGF0ZSIsImhhc0NsYXNzIiwiJHN1Ym1lbnUiLCJlcSIsImNoYW5nZVN1Yk1lbnUiLCJhbmltYXRlIiwic2Nyb2xsVG9wIiwib2Zmc2V0IiwidG9wIiwic3ViX21lbnUiLCIkaHR0cCIsImdldCIsInN0bV93cGNmdG9fYWpheHVybCIsIndwY2Z0b19nbG9iYWxfc2V0dGluZ3MiLCJyIiwiJHNldCIsImJvZHkiLCJzYXZlU2V0dGluZ3MiLCJpZCIsInZtIiwicG9zdCIsInN0bV93cGNmdG9fbm9uY2VzIiwiSlNPTiIsInN0cmluZ2lmeSIsInJlc3BvbnNlIiwiX3Jlc3BvbnNlJGJvZHkiLCJzZXRUaW1lb3V0IiwicmVsb2FkIiwiaW5pdE9wZW4iLCJmaWVsZCIsIm9wZW5lZCIsInZhbHVlIiwib3BlbkZpZWxkIiwiZW5hYmxlQWRkb24iLCIkZXZlbnQiLCJvcHRpb24iLCJjdXJyZW50SXRlbSIsInRhcmdldCIsInVybCIsIiRjb250YWluZXIiLCJyZW1vdmUiLCIkZ3JvdXAiLCIkY2hpbGRzIiwibGVuZ3RoIiwid2F0Y2giLCJkZWVwIiwiaGFuZGxlciJdLCJzb3VyY2VzIjpbImZha2VfZGRkOTE2ODQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbihmdW5jdGlvbiAoJCkge1xuICAkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XG4gICAgJCgnW2RhdGEtdnVlXScpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgdmFyICR0aGlzID0gJCh0aGlzKTtcbiAgICAgIHZhciBkYXRhX3ZhciA9ICR0aGlzLmF0dHIoJ2RhdGEtdnVlJyk7XG4gICAgICB2YXIgZGF0YV9zb3VyY2UgPSAkdGhpcy5hdHRyKCdkYXRhLXNvdXJjZScpO1xuICAgICAgbmV3IFZ1ZSh7XG4gICAgICAgIGVsOiAkKHRoaXMpWzBdLFxuICAgICAgICBkYXRhOiBmdW5jdGlvbiBkYXRhKCkge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBsb2FkaW5nOiBmYWxzZSxcbiAgICAgICAgICAgIGRhdGE6ICcnLFxuICAgICAgICAgICAgc2V0dGluZ3NfYWxlcnQ6IHtcbiAgICAgICAgICAgICAgc3RhdHVzOiBmYWxzZSxcbiAgICAgICAgICAgICAgc3VjY2VzczogdHJ1ZVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG4gICAgICAgIH0sXG4gICAgICAgIG1vdW50ZWQ6IGZ1bmN0aW9uIG1vdW50ZWQoKSB7XG4gICAgICAgICAgdGhpcy5nZXRTZXR0aW5ncygpO1xuICAgICAgICAgIHRoaXMuY2xlYXJFbXB0eUdyb3VwcygpO1xuICAgICAgICB9LFxuICAgICAgICBtZXRob2RzOiB7XG4gICAgICAgICAgaW5pdFN1Ym1lbnU6IGZ1bmN0aW9uIGluaXRTdWJtZW51KCkge1xuICAgICAgICAgICAgVnVlLm5leHRUaWNrKCkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgIChmdW5jdGlvbiAoJCkge1xuICAgICAgICAgICAgICAgIC8qSGlkZSBhbGwgZmllbGRzIGluIHN1Ym1lbnUqL1xuICAgICAgICAgICAgICAgIHZhciBzdWJtZW51X3RhYl9maWVsZHMgPSAkKCcud3BjZnRvLXRhYi5oYXMtc3VibWVudS1pdGVtcyBbZGF0YS1maWVsZF0sIC53cGNmdG8tdGFiLmhhcy1zdWJtZW51LWl0ZW1zIC53cGNmdG9fZ3JvdXBfc3RhcnRlZCcpO1xuICAgICAgICAgICAgICAgIHN1Ym1lbnVfdGFiX2ZpZWxkcy5jc3Moe1xuICAgICAgICAgICAgICAgICAgZGlzcGxheTogJ25vbmUnXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgdmFyICRzdWJfbWVudSA9ICQoJy53cGNmdG8tc3VibWVudXMgLmFjdGl2ZScpO1xuICAgICAgICAgICAgICAgIHZhciBzdWJfbWVudV9zZWN0aW9uID0gJHN1Yl9tZW51LmF0dHIoJ2RhdGEtc3VibWVudScpO1xuICAgICAgICAgICAgICAgIHZhciAkc3VibWVudV9zZWN0aW9uID0gJCgnLicgKyBzdWJfbWVudV9zZWN0aW9uKTtcbiAgICAgICAgICAgICAgICAkc3VibWVudV9zZWN0aW9uLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XG4gICAgICAgICAgICAgICAgc3VibWVudV90YWJfZmllbGRzLnBhcmVudHMoJy53cGNmdG9fZ3JvdXBfc3RhcnRlZCcpLmNzcyh7XG4gICAgICAgICAgICAgICAgICBkaXNwbGF5OiAnbm9uZSdcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAkc3VibWVudV9zZWN0aW9uLnBhcmVudHMoJy53cGNmdG9fZ3JvdXBfc3RhcnRlZCcpLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XG4gICAgICAgICAgICAgIH0pKGpRdWVyeSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIGNoYW5nZVRhYkZyb21BbmNob3I6IGZ1bmN0aW9uIGNoYW5nZVRhYkZyb21BbmNob3IoKSB7XG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgICAgICB2YXIgaGFzaCA9IHdpbmRvdy5sb2NhdGlvbi5oYXNoO1xuICAgICAgICAgICAgdmFyIGhhc2hQYXJ0cyA9IGhhc2guc3BsaXQoJyMnKTtcblxuICAgICAgICAgICAgaWYgKHR5cGVvZiBoYXNoUGFydHNbMV0gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgIFZ1ZS5uZXh0VGljayhmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuY2hhbmdlVGFiKGhhc2hQYXJ0c1sxXSk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgY2hhbmdlVGFiOiBmdW5jdGlvbiBjaGFuZ2VUYWIodGFiKSB7XG4gICAgICAgICAgICB2YXIgJHRhYiA9ICQoJyMnICsgdGFiKTtcbiAgICAgICAgICAgICR0YWIuY2xvc2VzdCgnLnN0bV9tZXRhYm94ZXNfZ3JpZF9faW5uZXInKS5maW5kKCcud3BjZnRvLXRhYicpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICR0YWIuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgdmFyICRzZWN0aW9uID0gJCgnZGl2W2RhdGEtc2VjdGlvbj1cIicgKyB0YWIgKyAnXCJdJyk7XG4gICAgICAgICAgICAkdGFiLmNsb3Nlc3QoJy53cGNmdG8tc2V0dGluZ3MnKS5maW5kKCcud3BjZnRvLW5hdicpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICR0YWIuY2xvc2VzdCgnLnN0bV9tZXRhYm94ZXNfZ3JpZF9faW5uZXInKS5maW5kKCcud3BjZnRvLW5hdicpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICRzZWN0aW9uLmNsb3Nlc3QoJy53cGNmdG8tbmF2JykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgaGlzdG9yeS5wdXNoU3RhdGUobnVsbCwgbnVsbCwgJyMnICsgdGFiKTtcbiAgICAgICAgICAgIC8qaWYgaGFzIHN1Ym1lbnUqL1xuXG4gICAgICAgICAgICBpZiAoJHNlY3Rpb24uY2xvc2VzdCgnLndwY2Z0by1uYXYnKS5oYXNDbGFzcygnaGFzLXN1Ym1lbnUnKSkge1xuICAgICAgICAgICAgICB2YXIgJHN1Ym1lbnUgPSAkc2VjdGlvbi5jbG9zZXN0KCcud3BjZnRvLW5hdicpLmZpbmQoJy53cGNmdG8tc3VibWVudXMgW2RhdGEtc3VibWVudV0nKS5lcSgwKTtcbiAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VTdWJNZW51KCRzdWJtZW51LmF0dHIoJ2RhdGEtc3VibWVudScpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8qU2Nyb2xsIHRvcCovXG5cblxuICAgICAgICAgICAgJChcImh0bWwsIGJvZHlcIikuYW5pbWF0ZSh7XG4gICAgICAgICAgICAgIHNjcm9sbFRvcDogJHRhYi5jbG9zZXN0KCcuc3RtX21ldGFib3hlc19ncmlkX19pbm5lcicpLm9mZnNldCgpLnRvcCAtIDEwMFxuICAgICAgICAgICAgfSwgXCJmYXN0XCIpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgY2hhbmdlU3ViTWVudTogZnVuY3Rpb24gY2hhbmdlU3ViTWVudShzdWJfbWVudSkge1xuICAgICAgICAgICAgdmFyICRzdWJtZW51ID0gJCgnW2RhdGEtc3VibWVudT1cIicgKyBzdWJfbWVudSArICdcIl0nKTtcbiAgICAgICAgICAgICQoJ1tkYXRhLXN1Ym1lbnVdJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgJHN1Ym1lbnUuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgdGhpcy5pbml0U3VibWVudSgpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgZ2V0U2V0dGluZ3M6IGZ1bmN0aW9uIGdldFNldHRpbmdzKCkge1xuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgICAgICAgICAgX3RoaXMubG9hZGluZyA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLiRodHRwLmdldChzdG1fd3BjZnRvX2FqYXh1cmwgKyAnP2FjdGlvbj1zdG1fd3BjZnRvX2dldF9zZXR0aW5ncyZzb3VyY2U9JyArIGRhdGFfc291cmNlICsgJyZuYW1lPScgKyBkYXRhX3ZhciArICcmbm9uY2U9JyArIHdwY2Z0b19nbG9iYWxfc2V0dGluZ3NbJ25vbmNlJ10pLnRoZW4oZnVuY3Rpb24gKHIpIHtcbiAgICAgICAgICAgICAgX3RoaXMuJHNldChfdGhpcywgJ2RhdGEnLCByLmJvZHkpO1xuXG4gICAgICAgICAgICAgIF90aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VUYWJGcm9tQW5jaG9yKCk7XG4gICAgICAgICAgICAgIHRoaXMuaW5pdFN1Ym1lbnUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgc2F2ZVNldHRpbmdzOiBmdW5jdGlvbiBzYXZlU2V0dGluZ3MoaWQpIHtcbiAgICAgICAgICAgIHZhciB2bSA9IHRoaXM7XG4gICAgICAgICAgICB2bS5sb2FkaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuJGh0dHAucG9zdChzdG1fd3BjZnRvX2FqYXh1cmwgKyAnP2FjdGlvbj13cGNmdG9fc2F2ZV9zZXR0aW5ncyZub25jZT0nICsgc3RtX3dwY2Z0b19ub25jZXNbJ3dwY2Z0b19zYXZlX3NldHRpbmdzJ10gKyAnJm5hbWU9JyArIGlkLCBKU09OLnN0cmluZ2lmeSh2bS5kYXRhKSkudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgdmFyIF9yZXNwb25zZSRib2R5O1xuXG4gICAgICAgICAgICAgIHZtLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgdm0uc2V0dGluZ3NfYWxlcnQgPSB7XG4gICAgICAgICAgICAgICAgc3VjY2VzczogcmVzcG9uc2Uuc3RhdHVzID09PSAyMDAsXG4gICAgICAgICAgICAgICAgc3RhdHVzOiB0cnVlXG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZtLnNldHRpbmdzX2FsZXJ0LnN0YXR1cyA9IGZhbHNlO1xuICAgICAgICAgICAgICB9LCAxNTAwKTtcbiAgICAgICAgICAgICAgaWYgKCgoX3Jlc3BvbnNlJGJvZHkgPSByZXNwb25zZS5ib2R5KSA9PT0gbnVsbCB8fCBfcmVzcG9uc2UkYm9keSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX3Jlc3BvbnNlJGJvZHkucmVsb2FkKSA9PT0gdHJ1ZSkgbG9jYXRpb24ucmVsb2FkKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIGluaXRPcGVuOiBmdW5jdGlvbiBpbml0T3BlbihmaWVsZCkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBmaWVsZC5vcGVuZWQgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgIHRoaXMuJHNldChmaWVsZCwgJ29wZW5lZCcsICEhZmllbGQudmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgb3BlbkZpZWxkOiBmdW5jdGlvbiBvcGVuRmllbGQoZmllbGQpIHtcbiAgICAgICAgICAgIHZhciBvcGVuZWQgPSAhZmllbGQub3BlbmVkO1xuICAgICAgICAgICAgdGhpcy4kc2V0KGZpZWxkLCAnb3BlbmVkJywgb3BlbmVkKTtcblxuICAgICAgICAgICAgaWYgKCFmaWVsZC5vcGVuZWQpIHtcbiAgICAgICAgICAgICAgdGhpcy4kc2V0KGZpZWxkLCAndmFsdWUnLCAnJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICBlbmFibGVBZGRvbjogZnVuY3Rpb24gZW5hYmxlQWRkb24oJGV2ZW50LCBvcHRpb24pIHtcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgICAgIFZ1ZS5uZXh0VGljayhmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgIChmdW5jdGlvbiAoJCkge1xuICAgICAgICAgICAgICAgIHZhciBjdXJyZW50SXRlbSA9ICQoJGV2ZW50LnRhcmdldCk7XG4gICAgICAgICAgICAgICAgY3VycmVudEl0ZW0uYWRkQ2xhc3MoJ2xvYWRpbmcnKTtcbiAgICAgICAgICAgICAgICB2YXIgdXJsID0gc3RtX3dwY2Z0b19hamF4dXJsICsgJz9hY3Rpb249c3RtX2xtc19lbmFibGVfYWRkb24mYWRkb249JyArIG9wdGlvbjtcblxuICAgICAgICAgICAgICAgIF90aGlzLiRodHRwLmdldCh1cmwpLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgICBjdXJyZW50SXRlbS5yZW1vdmVDbGFzcygnbG9hZGluZycpO1xuICAgICAgICAgICAgICAgICAgdmFyICRjb250YWluZXIgPSAkKCcuc3RtX2xtc19hZGRvbl9ncm91cF9zZXR0aW5nc18nICsgb3B0aW9uKTtcbiAgICAgICAgICAgICAgICAgICRjb250YWluZXIuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciAkdGhpcyA9ICQodGhpcyk7XG4gICAgICAgICAgICAgICAgICAgICR0aGlzLnJlbW92ZUNsYXNzKCdpc19wcm8gaXNfcHJvX2luX2FkZG9uJyk7XG4gICAgICAgICAgICAgICAgICAgICR0aGlzLmZpbmQoJy5maWVsZF9vdmVybGF5JykucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgICAgICR0aGlzLmZpbmQoJy5wcm8tbm90aWNlJykucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfSkoalF1ZXJ5KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgY2xlYXJFbXB0eUdyb3VwczogZnVuY3Rpb24gY2xlYXJFbXB0eUdyb3VwcygpIHtcbiAgICAgICAgICAgIFZ1ZS5uZXh0VGljaygpLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAoZnVuY3Rpb24gKCQpIHtcbiAgICAgICAgICAgICAgICAkKCcud3BjZnRvX2dyb3VwX3N0YXJ0ZWQnKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgIHZhciAkZ3JvdXAgPSAkKHRoaXMpO1xuICAgICAgICAgICAgICAgICAgdmFyICRjaGlsZHMgPSAkZ3JvdXAuZmluZCgnLndwY2Z0by1ib3gtY2hpbGQnKTtcblxuICAgICAgICAgICAgICAgICAgaWYgKCEkY2hpbGRzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAkZ3JvdXAuYWRkQ2xhc3MoJ25vLWNoaWxkcy12aXNpYmxlJyk7XG4gICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAkZ3JvdXAucmVtb3ZlQ2xhc3MoJ25vLWNoaWxkcy12aXNpYmxlJyk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH0pKGpRdWVyeSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHdhdGNoOiB7XG4gICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgZGVlcDogdHJ1ZSxcbiAgICAgICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uIGhhbmRsZXIoKSB7XG4gICAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuY2xlYXJFbXB0eUdyb3VwcygpO1xuXG4gICAgICAgICAgICAgICAgX3RoaXMuaW5pdFN1Ym1lbnUoKTtcbiAgICAgICAgICAgICAgfSwgMTAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xu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
},{}]},{},[1])