/**
 * Admin JavaScript for Xgenious UI Blocks.
 */

(function($) {
    'use strict';

    // Settings Page
    const SettingsPage = {
        init: function() {
            this.bindEvents();
        },

        bindEvents: function() {
            $('#xgenious-ui-blocks-settings-form').on('submit', this.saveSettings);
        },

        saveSettings: function(e) {
            e.preventDefault();

            const $form = $(this);
            const $button = $('#save-settings');
            const $spinner = $form.find('.spinner');

            // Show loading state
            $button.prop('disabled', true);
            $spinner.addClass('is-active');

            // Collect form data
            const formData = {
                action: 'xgenious_ui_blocks_save_settings',
                nonce: xgeniousUIBlocksAdmin.nonce,
                google_fonts: $('#google_fonts').is(':checked'),
                font_awesome: $('#font_awesome').is(':checked'),
                animation_library: $('#animation_library').is(':checked'),
            };

            // Save settings
            $.post(xgeniousUIBlocksAdmin.ajaxUrl, formData)
                .done(function(response) {
                    if (response.success) {
                        // Show success message
                        showNotice('success', response.data.message);
                    } else {
                        showNotice('error', response.data.message || 'Failed to save settings');
                    }
                })
                .fail(function() {
                    showNotice('error', 'Failed to save settings. Please try again.');
                })
                .always(function() {
                    $button.prop('disabled', false);
                    $spinner.removeClass('is-active');
                });
        }
    };

    // Blocks Manager
    const BlocksManager = {
        enabledBlocks: [],

        init: function() {
            this.loadEnabledBlocks();
            this.bindEvents();
        },

        loadEnabledBlocks: function() {
            const self = this;
            $('.block-toggle:checked').each(function() {
                self.enabledBlocks.push($(this).data('block'));
            });
        },

        bindEvents: function() {
            $('.block-toggle').on('change', this.toggleBlock.bind(this));
            $('#save-blocks').on('click', this.saveBlocks.bind(this));
            $('#enable-all-blocks').on('click', this.enableAllBlocks.bind(this));
            $('#disable-all-blocks').on('click', this.disableAllBlocks.bind(this));
        },

        toggleBlock: function(e) {
            const $toggle = $(e.target);
            const blockName = $toggle.data('block');
            const $card = $toggle.closest('.block-card');
            const $statusText = $card.find('.status-text');

            if ($toggle.is(':checked')) {
                // Enable block
                $card.removeClass('disabled').addClass('enabled');
                $statusText.text('Enabled');

                if (!this.enabledBlocks.includes(blockName)) {
                    this.enabledBlocks.push(blockName);
                }
            } else {
                // Disable block
                $card.removeClass('enabled').addClass('disabled');
                $statusText.text('Disabled');

                const index = this.enabledBlocks.indexOf(blockName);
                if (index > -1) {
                    this.enabledBlocks.splice(index, 1);
                }
            }
        },

        enableAllBlocks: function() {
            $('.block-toggle').prop('checked', true).trigger('change');
        },

        disableAllBlocks: function() {
            $('.block-toggle').prop('checked', false).trigger('change');
        },

        saveBlocks: function() {
            const $button = $('#save-blocks');
            const $spinner = $('.blocks-actions .spinner');

            // Show loading state
            $button.prop('disabled', true);
            $spinner.addClass('is-active');

            // Save settings
            const formData = {
                action: 'xgenious_ui_blocks_save_settings',
                nonce: xgeniousUIBlocksAdmin.nonce,
                enabled_blocks: this.enabledBlocks,
            };

            $.post(xgeniousUIBlocksAdmin.ajaxUrl, formData)
                .done(function(response) {
                    if (response.success) {
                        showNotice('success', 'Blocks settings saved successfully!');
                    } else {
                        showNotice('error', response.data.message || 'Failed to save blocks');
                    }
                })
                .fail(function() {
                    showNotice('error', 'Failed to save blocks. Please try again.');
                })
                .always(function() {
                    $button.prop('disabled', false);
                    $spinner.removeClass('is-active');
                });
        }
    };

    // Show admin notice
    function showNotice(type, message) {
        const noticeClass = type === 'success' ? 'notice-success' : 'notice-error';
        const $notice = $('<div class="notice ' + noticeClass + ' is-dismissible"><p>' + message + '</p></div>');

        // Insert notice
        $('.wrap > h1').after($notice);

        // Auto dismiss after 3 seconds
        setTimeout(function() {
            $notice.fadeTo(100, 0, function() {
                $notice.slideUp(100, function() {
                    $notice.remove();
                });
            });
        }, 3000);

        // Make dismissible
        $notice.on('click', '.notice-dismiss', function() {
            $notice.fadeTo(100, 0, function() {
                $notice.slideUp(100, function() {
                    $notice.remove();
                });
            });
        });
    }

    // Initialize on document ready
    $(document).ready(function() {
        // Initialize settings page
        if ($('#xgenious-ui-blocks-settings-form').length) {
            SettingsPage.init();
        }

        // Initialize blocks manager
        if ($('.xgenious-ui-blocks-manager').length) {
            BlocksManager.init();
        }
    });

})(jQuery);
