Vue.component('search-by-settings', {
    props: ['settings', 'placeholder', 'notfound'],
    data: function () {
        return {
            data: {},
            found: {},
            value: '',
            selected: {},
            inFocus: false,
            selectedBlinkTimeout: false,
            hoverOnResults: false,
            searchTimeout: false,
            searchDone: false,
            container: false
        }
    },
    mounted: function () {
        let settingsContainer = this.$el.closest('.wpcfto-settings');
        this.container = settingsContainer ? settingsContainer : document;
    },
    template: `
        <div class="wpcfto_search_group">
			<input @focus="focusIn" @focusout="focusOut" @input="search" type="text" name="" v-model="value" class="wpcfto-search-field" :placeholder="placeholder"/>
            <div @mouseenter="resultsHover" @mouseleave="resultsHoverOut" v-if="value.length && Object.keys(found).length && inFocus" class="wpcfto-search-results">
                <div @click="goToOption" class="wpcfto-search-result" v-for="(item, key) in found" :data-key="key">
                    <div class="wpcfto-search-result-name" :data-key="key">{{ item.label_begin }}<span :data-key="key">{{ item.label_match }}</span>{{ item.label_end }}</div>
                    <div class="wpcfto-search-result-section" :data-key="key">
                        {{ decodeHTMLEntities(settings[item.section_id].name) }}
                        <span :data-key="key" v-if="settings[item.section_id].fields[item.field_id] && settings[item.section_id].fields[item.field_id].submenu">{{ decodeHTMLEntities(settings[item.section_id].fields[item.field_id].submenu) }}</span>
                    </div>
                </div>
            </div>
            <div v-if="value.length" @click="removeSearchValue" class="wpcfto-remove-search-value"></div>
            <div @mouseenter="resultsHover" @mouseleave="resultsHoverOut" v-if="value.length && searchDone === true && Object.keys(found).length === 0 && inFocus" class="wpcfto-search-results not-found">
                <div class="wpcfto-search-result">
                    <div class="wpcfto-search-result-name"><i class="nuxy-notfound-icon"></i>{{ notfound }}</div>
                </div>
            </div>
        </div>
    `,
    methods: {
        search: function( e ) {
            this.searchDone = false;
            if ( this.searchTimeout ) {
                clearTimeout(this.searchTimeout);
            }

            this.searchTimeout = setTimeout(() => {
                let doc    = new DOMParser().parseFromString(this.value, 'text/html');
                let search = this.decodeHTMLEntities(doc.body.textContent.trim().toLowerCase()) || '';
           
                this.found = {};
                if ( search ) {
                    for ( let sectionID in this.settings ) {
                        let section = this.settings[sectionID];
                        
                        for ( let fieldID in section.fields ) {
                            let field = section.fields[fieldID];
                            if ( field.label && field.type !== 'group_title' ) {
                                
                                let fieldLabelInResults = this.decodeHTMLEntities(field.label);
                                let fieldLabel  = fieldLabelInResults.toLowerCase()
                                let searchIndex = fieldLabel.indexOf( search );
                                let fieldNode   = this.container.querySelector('.wpcfto-box-child.wpcfto-box-of-' + fieldID + ', .wpcfto-box.wpcfto-box-of-' + fieldID);
                                
                                if ( fieldNode && searchIndex !== -1 && !fieldNode.classList.contains('notice_banner') && !fieldNode.classList.contains('pro_banner') ) {
                                    this.found[sectionID + '_' + fieldID] = {
                                        section_id: sectionID,
                                        field_id: fieldID,
                                        label_begin: this.decodeHTMLEntities(fieldLabelInResults.slice(0, searchIndex)),
                                        label_match: this.decodeHTMLEntities(fieldLabelInResults.slice(searchIndex, searchIndex + search.length)),
                                        label_end: this.decodeHTMLEntities(fieldLabelInResults.slice(searchIndex + search.length)),
                                    };
                                }
                            }
                        }
                    }
                }

                this.searchDone = true;
            }, 300)
            
        },
        decodeHTMLEntities: function( str ) {
            let textarea = document.createElement("textarea");
            textarea.innerHTML = str;
            return textarea.value;
        },
        goToOption: function( e ) {
            let ths = this;
            Vue.nextTick().then(() => {
                let optionKey = e.target.getAttribute('data-key');
                let selected  = this.found[optionKey];
                let tabTitle  = this.container.querySelector('[data-section="' + selected.section_id + '"].wpcfto-nav-title');
                let activeTabs = this.container.querySelectorAll( '.wpcfto-nav.active, .wpcfto-submenus > .active' );
                let selectedSubmenu = this.settings[selected.section_id].fields[selected.field_id] ? this.settings[selected.section_id].fields[selected.field_id].submenu : false;
                let activeTabsContent = this.container.querySelectorAll('.wpcfto-tab.active');
                let selectedTabContent = this.container.querySelector('.wpcfto-tab#' + selected.section_id);
                let activeSubmenu;
                let selectedField = this.container.querySelector('.wpcfto-box.wpcfto-box-of-' + selected.field_id + ', .wpcfto-box-child.wpcfto-box-of-' + selected.field_id);
                let previousSelectedFields = this.container.querySelectorAll('.wpcfto-box.selected-field, .wpcfto-box-child.selected-field');
              
                for ( let field of previousSelectedFields ) {
                    if ( field.classList.contains('selected-field') ) {
                        field.classList.remove('selected-field')
                    }
                }

                for ( let activeTab of activeTabs ) {
                    activeTab.classList.remove('active');
                }

                for ( let tabContent of activeTabsContent ) {
                    tabContent.classList.remove('active');
                    if ( tabContent.classList.contains('has-submenu') || tabContent.classList.contains('has-submenu-items') ) {
                        let activeSubMenuFields = tabContent.querySelectorAll('.wpcfto-box');
                        for ( let field of activeSubMenuFields ) {
                            field.setAttribute('style', 'display:none');
                        }
                    }
                }
    
                tabTitle.closest('.wpcfto-nav').classList.add('active');
                selectedTabContent.classList.add('active');
                
                if ( selectedSubmenu ) {
                    let selectedMenuItem = this.container.querySelector('[data-section="' + selected.section_id + '"].wpcfto-nav-title');
                    if ( selectedMenuItem ) {
                        selectedMenuItem = selectedMenuItem.closest('.wpcfto-nav');
                        let submenus = selectedMenuItem.querySelectorAll('.wpcfto-submenus > div');
                        
                        for ( let submenu of submenus ) {
                            if ( submenu.textContent.trim() === selectedSubmenu.trim() ) {
                                activeSubmenu = submenu;
                                submenu.classList.add('active');
                                break;
                            }
                        }
                        let fields = selectedTabContent.querySelectorAll('.wpcfto-box.' + activeSubmenu.getAttribute('data-submenu') + ', .wpcfto-box.' + activeSubmenu.getAttribute('data-submenu') + ' .wpcfto-box-child');
                        for ( let field of fields ) {
                            field.removeAttribute('style');
                        }
                    } 
                } else {
                    let fields = selectedTabContent.querySelectorAll('.wpcfto-box, .wpcfto-box-child');
                    for ( let field of fields ) {
                        field.removeAttribute('style');
                    }
                }

                clearTimeout( ths.selectedBlinkTimeout );

                selectedField.classList.add('selected-field');
                window.scrollTo({
                    top: selectedField.getBoundingClientRect().top + window.scrollY - 180,
                    behavior: 'smooth'
                });

                ths.inFocus = false;
                
                ths.selectedBlinkTimeout = setTimeout(function() {
                    if ( selectedField.classList.contains('selected-field') ) {
                        selectedField.classList.remove('selected-field')
                    }
                }, 4100)
            });
        },
        focusIn: function( e ) {
            this.inFocus = true;
        },
        focusOut: function( e ) {
            if ( ! this.hoverOnResults || ! Object.keys(this.found).length ) {
                this.inFocus = false;
            }
        },
        removeSearchValue: function() {
            this.value = '';
            this.container.querySelector('.wpcfto-search-field').focus();
        },
        resultsHover: function() {
            this.hoverOnResults = true;
        },
        resultsHoverOut: function() {
            this.hoverOnResults = false;
        }
    },
    watch: {
        value: function (value) {
            this.value = value;
        }
    },
});
