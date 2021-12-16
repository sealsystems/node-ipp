import statusCodes from './statusCodes';

/* eslint-disable no-sparse-arrays */
/* eslint-disable line-comment-position */
/* eslint-disable no-inline-comments */

enum documentState {
  'pending' = 0x03,
  'processing' = 0x05,
  'canceled' = 0x07,
  'aborted' = 0x08,
  'completed' = 0x09
}

enum finishings {
  'none' = 0x03, // http://tools.ietf.org/html/rfc2911#section-4.2.6
  'staple' = 0x04, // http://tools.ietf.org/html/rfc2911#section-4.2.6
  'punch' = 0x05, // http://tools.ietf.org/html/rfc2911#section-4.2.6
  'cover' = 0x06, // http://tools.ietf.org/html/rfc2911#section-4.2.6
  'bind' = 0x07, // http://tools.ietf.org/html/rfc2911#section-4.2.6
  'saddle-stitch' = 0x08, // http://tools.ietf.org/html/rfc2911#section-4.2.6
  'edge-stitch' = 0x09, // http://tools.ietf.org/html/rfc2911#section-4.2.6
  'fold' = 0x0a, // http://tools.ietf.org/html/rfc2911#section-4.2.6
  'trim' = 0x0b, // ftp://ftp.pwg.org/pub/pwg/ipp/new_val/pwg5100.1.pdf
  'bale' = 0x0c, // ftp://ftp.pwg.org/pub/pwg/ipp/new_val/pwg5100.1.pdf
  'booklet-maker' = 0x0d, // ftp://ftp.pwg.org/pub/pwg/ipp/new_val/pwg5100.1.pdf
  'jog-offset' = 0x0e, // ftp://ftp.pwg.org/pub/pwg/ipp/new_val/pwg5100.1.pdf
  'staple-top-left' = 0x14, // http://tools.ietf.org/html/rfc2911#section-4.2.6
  'staple-bottom-left' = 0x15, // http://tools.ietf.org/html/rfc2911#section-4.2.6
  'staple-top-right' = 0x16, // http://tools.ietf.org/html/rfc2911#section-4.2.6
  'staple-bottom-right' = 0x17, // http://tools.ietf.org/html/rfc2911#section-4.2.6
  'edge-stitch-left' = 0x18, // http://tools.ietf.org/html/rfc2911#section-4.2.6
  'edge-stitch-top' = 0x19, // http://tools.ietf.org/html/rfc2911#section-4.2.6
  'edge-stitch-right' = 0x1a, // http://tools.ietf.org/html/rfc2911#section-4.2.6
  'edge-stitch-bottom' = 0x1b, // http://tools.ietf.org/html/rfc2911#section-4.2.6
  'staple-dual-left' = 0x1c, // http://tools.ietf.org/html/rfc2911#section-4.2.6
  'staple-dual-top' = 0x1d, // http://tools.ietf.org/html/rfc2911#section-4.2.6
  'staple-dual-right' = 0x1e, // http://tools.ietf.org/html/rfc2911#section-4.2.6
  'staple-dual-bottom' = 0x1f, // http://tools.ietf.org/html/rfc2911#section-4.2.6
  'bind-left' = 0x32, // ftp://ftp.pwg.org/pub/pwg/ipp/new_val/pwg5100.1.pdf
  'bind-top' = 0x33, // ftp://ftp.pwg.org/pub/pwg/ipp/new_val/pwg5100.1.pdf
  'bind-right' = 0x34, // ftp://ftp.pwg.org/pub/pwg/ipp/new_val/pwg5100.1.pdf
  'bind-bottom' = 0x35, // ftp://ftp.pwg.org/pub/pwg/ipp/new_val/pwg5100.1.pdf
  'trim-after-pages' = 0x3c, // ftp://ftp.pwg.org/pub/pwg/candidates/cs-ippjobprinterext3v10-20120727-5100.13.pdf (ipp everywhere)
  'trim-after-documents' = 0x3d, // ftp://ftp.pwg.org/pub/pwg/candidates/cs-ippjobprinterext3v10-20120727-5100.13.pdf (ipp everywhere)
  'trim-after-copies' = 0x3e, // ftp://ftp.pwg.org/pub/pwg/candidates/cs-ippjobprinterext3v10-20120727-5100.13.pdf (ipp everywhere)
  'trim-after-job' = 0x3f // ftp://ftp.pwg.org/pub/pwg/candidates/cs-ippjobprinterext3v10-20120727-5100.13.pdf (ipp everywhere)
}


enum operationsSupported {
  'Print-Job' = 0x02, // http://tools.ietf.org/html/rfc2911#section-3.2.1
  'Print-URI' = 0x03, // http://tools.ietf.org/html/rfc2911#section-3.2.2
  'Validate-Job' = 0x04, // http://tools.ietf.org/html/rfc2911#section-3.2.3
  'Create-Job' = 0x05, // http://tools.ietf.org/html/rfc2911#section-3.2.4
  'Send-Document' = 0x06, // http://tools.ietf.org/html/rfc2911#section-3.3.1
  'Send-URI' = 0x07, // http://tools.ietf.org/html/rfc2911#section-3.3.2
  'Cancel-Job' = 0x08, // http://tools.ietf.org/html/rfc2911#section-3.3.3
  'Get-Job-Attributes' = 0x09, // http://tools.ietf.org/html/rfc2911#section-3.3.4
  'Get-Jobs' = 0x0A, // http://tools.ietf.org/html/rfc2911#section-3.2.6
  'Get-Printer-Attributes' = 0x0B, // http://tools.ietf.org/html/rfc2911#section-3.2.5
  'Hold-Job' = 0x0C, // http://tools.ietf.org/html/rfc2911#section-3.3.5
  'Release-Job' = 0x0D, // http://tools.ietf.org/html/rfc2911#section-3.3.6
  'Restart-Job' = 0x0E, // http://tools.ietf.org/html/rfc2911#section-3.3.7
  'Pause-Printer' = 0x10, // http://tools.ietf.org/html/rfc2911#section-3.2.7
  'Resume-Printer' = 0x11, // http://tools.ietf.org/html/rfc2911#section-3.2.8
  'Purge-Jobs' = 0x12, // http://tools.ietf.org/html/rfc2911#section-3.2.9
  'Set-Printer-Attributes' = 0x13, // IPP2.1 http://tools.ietf.org/html/rfc3380#section-4.1
  'Set-Job-Attributes' = 0x14, // IPP2.1 http://tools.ietf.org/html/rfc3380#section-4.2
  'Get-Printer-Supported-Values' = 0x15, // IPP2.1 http://tools.ietf.org/html/rfc3380#section-4.3
  'Create-Printer-Subscriptions' = 0x16, // IPP2.1 http://tools.ietf.org/html/rfc3995#section-7.1 && http://tools.ietf.org/html/rfc3995#section-11.1.2
  'Create-Job-Subscription' = 0x17, // IPP2.1 http://tools.ietf.org/html/rfc3995#section-7.1 && http://tools.ietf.org/html/rfc3995#section-11.1.1
  'Get-Subscription-Attributes' = 0x18, // IPP2.1 http://tools.ietf.org/html/rfc3995#section-7.1 && http://tools.ietf.org/html/rfc3995#section-11.2.4
  'Get-Subscriptions' = 0x19, // IPP2.1 http://tools.ietf.org/html/rfc3995#section-7.1 && http://tools.ietf.org/html/rfc3995#section-11.2.5
  'Renew-Subscription' = 0x1A, // IPP2.1 http://tools.ietf.org/html/rfc3995#section-7.1 && http://tools.ietf.org/html/rfc3995#section-11.2.6
  'Cancel-Subscription' = 0x1B, // IPP2.1 http://tools.ietf.org/html/rfc3995#section-7.1 && http://tools.ietf.org/html/rfc3995#section-11.2.7
  'Get-Notifications' = 0x1C, // IPP2.1 IPP2.1 http://tools.ietf.org/html/rfc3996#section-9.2 && http://tools.ietf.org/html/rfc3996#section-5
  'ipp-indp-method' = 0x1D, // did not get standardized
  'Get-Resource-Attributes' = 0x1E, // http://tools.ietf.org/html/draft-ietf-ipp-get-resource-00#section-4.1 did not get standardized
  'Get-Resource-Data' = 0x1F, // http://tools.ietf.org/html/draft-ietf-ipp-get-resource-00#section-4.2 did not get standardized
  'Get-Resources' = 0x20, // http://tools.ietf.org/html/draft-ietf-ipp-get-resource-00#section-4.3 did not get standardized
  'ipp-install' = 0x21, // did not get standardized
  'Enable-Printer' = 0x22, // http://tools.ietf.org/html/rfc3998#section-3.1.1
  'Disable-Printer' = 0x23, // http://tools.ietf.org/html/rfc3998#section-3.1.2
  'Pause-Printer-After-Current-Job' = 0x24, // http://tools.ietf.org/html/rfc3998#section-3.2.1
  'Hold-New-Jobs' = 0x25, // http://tools.ietf.org/html/rfc3998#section-3.3.1
  'Release-Held-New-Jobs' = 0x26, // http://tools.ietf.org/html/rfc3998#section-3.3.2
  'Deactivate-Printer' = 0x27, // http://tools.ietf.org/html/rfc3998#section-3.4.1
  'Activate-Printer' = 0x28, // http://tools.ietf.org/html/rfc3998#section-3.4.2
  'Restart-Printer' = 0x29, // http://tools.ietf.org/html/rfc3998#section-3.5.1
  'Shutdown-Printer' = 0x2A, // http://tools.ietf.org/html/rfc3998#section-3.5.2
  'Startup-Printer' = 0x2B, // http://tools.ietf.org/html/rfc3998#section-3.5.3
  'Reprocess-Job' = 0x2C, // http://tools.ietf.org/html/rfc3998#section-4.1
  'Cancel-Current-Job' = 0x2D, // http://tools.ietf.org/html/rfc3998#section-4.2
  'Suspend-Current-Job' = 0x2E, // http://tools.ietf.org/html/rfc3998#section-4.3.1
  'Resume-Job' = 0x2F, // http://tools.ietf.org/html/rfc3998#section-4.3.2
  'Promote-Job' = 0x30, // http://tools.ietf.org/html/rfc3998#section-4.4.1
  'Schedule-Job-After' = 0x31, // http://tools.ietf.org/html/rfc3998#section-4.4.2
  'Cancel-Document' = 0x33, // ftp://ftp.pwg.org/pub/pwg/candidates/cs-ippdocobject10-20031031-5100.5.pdf
  'Get-Document-Attributes' = 0x34, // ftp://ftp.pwg.org/pub/pwg/candidates/cs-ippdocobject10-20031031-5100.5.pdf
  'Get-Documents' = 0x35, // ftp://ftp.pwg.org/pub/pwg/candidates/cs-ippdocobject10-20031031-5100.5.pdf
  'Delete-Document' = 0x36, // ftp://ftp.pwg.org/pub/pwg/candidates/cs-ippdocobject10-20031031-5100.5.pdf
  'Set-Document-Attributes' = 0x37, // ftp://ftp.pwg.org/pub/pwg/candidates/cs-ippdocobject10-20031031-5100.5.pdf
  'Cancel-Jobs' = 0x38, // ftp://ftp.pwg.org/pub/pwg/candidates/cs-ippjobprinterext10-20101030-5100.11.pdf
  'Cancel-My-Jobs' = 0x39, // ftp://ftp.pwg.org/pub/pwg/candidates/cs-ippjobprinterext10-20101030-5100.11.pdf
  'Resubmit-Job' = 0x3A, // ftp://ftp.pwg.org/pub/pwg/candidates/cs-ippjobprinterext10-20101030-5100.11.pdf
  'Close-Job' = 0x3B, // ftp://ftp.pwg.org/pub/pwg/candidates/cs-ippjobprinterext10-20101030-5100.11.pdf
  'Identify-Printer' = 0x3C, // ftp://ftp.pwg.org/pub/pwg/candidates/cs-ippjobprinterext3v10-20120727-5100.13.pdf
  'Validate-Document' = 0x3D, // ftp://ftp.pwg.org/pub/pwg/candidates/cs-ippjobprinterext3v10-20120727-5100.13.pdf
  'Add-Document-Images',
  'Acknowledge-Document' = 0x3f, // http://ftp.pwg.org/pub/pwg/candidates/cs-ippinfra10-20150619-5100.18.pdf
  'Acknowledge-Identify-Printer' = 0x40, // http://ftp.pwg.org/pub/pwg/candidates/cs-ippinfra10-20150619-5100.18.pdf
  'Acknowledge-Job' = 0x41, // http://ftp.pwg.org/pub/pwg/candidates/cs-ippinfra10-20150619-5100.18.pdf
  'Fetch-Document' = 0x42, // http://ftp.pwg.org/pub/pwg/candidates/cs-ippinfra10-20150619-5100.18.pdf
  'Fetch-Job' = 0x43, // http://ftp.pwg.org/pub/pwg/candidates/cs-ippinfra10-20150619-5100.18.pdf
  'Get-Output-Device-Attributes' = 0x44, // http://ftp.pwg.org/pub/pwg/candidates/cs-ippinfra10-20150619-5100.18.pdf
  'Update-Active-Jobs' = 0x45, // http://ftp.pwg.org/pub/pwg/candidates/cs-ippinfra10-20150619-5100.18.pdf
  'Deregister-Output-Device' = 0x46, // http://ftp.pwg.org/pub/pwg/candidates/cs-ippinfra10-20150619-5100.18.pdf
  'Update-Document-Status' = 0x47, // http://ftp.pwg.org/pub/pwg/candidates/cs-ippinfra10-20150619-5100.18.pdf
  'Update-Job-Status' = 0x48, // http://ftp.pwg.org/pub/pwg/candidates/cs-ippinfra10-20150619-5100.18.pdf
  'Update-Output-Device-Attributes' = 0x49, // http://ftp.pwg.org/pub/pwg/candidates/cs-ippinfra10-20150619-5100.18.pdf
  'Get-Next-Document-Data' = 0x4A,
  'Allocate-Printer-Resources' = 0x4B,
  'Create-Printer' = 0x4C,
  'Deallocate-Printer-Resources' = 0x4D,
  'Delete-Printer' = 0x4E,
  'Get-Printers' = 0x4F,
  'Shutdown-One-Printer' = 0x50,
  'Startup-One-Printer' = 0x51,
  'Cancel-Resource' = 0x52,
  'Create-Resource' = 0x53,
  'Install-Resource' = 0x54,
  'Send-Resource-Data' = 0x55,
  'Set-Resource-Attributes' = 0x56,
  'Create-Resource-Subscriptions' = 0x57,
  'Create-System-Subscriptions' = 0x58,
  'Disable-All-Printers' = 0x59,
  'Enable-All-Printers' = 0x5A,
  'Get-System-Attributes' = 0x5B,
  'Get-System-Supported-Values' = 0x5C,
  'Pause-All-Printers' = 0x5D,
  'Pause-All-Printers-After-Current-Job' = 0x5E,
  'Register-Output-Device' = 0x5F,
  'Restart-System' = 0x60,
  'Resume-All-Printers' = 0x61,
  'Set-System-Attributes' = 0x62,
  'Shutdown-All-Printers' = 0x63,
  'Startup-All-Printers' = 0x64,
}

enum cupsOperationsSupported {
  'Microsoft' = 0x00,
  'CUPS-Get-Default' = 0x4001,
  'CUPS-Get-Printers' = 0x4002,
  'CUPS-Add-Modify-Printer' = 0x4003,
  'CUPS-Delete-Printer' = 0x4004,
  'CUPS-Get-Classes' = 0x4005,
  'CUPS-Add-Modify-Class' = 0x4006,
  'CUPS-Delete-Class' = 0x4007,
  'CUPS-Accept-Jobs' = 0x4008,
  'CUPS-Reject-Jobs' = 0x4009,
  'CUPS-Set-Default' = 0x400A,
  'CUPS-Get-Devices' = 0x400B,
  'CUPS-Get-PPDs' = 0x400C,
  'CUPS-Move-Job' = 0x400D,
  'CUPS-Authenticate-Job' = 0x400E,
  'CUPS-Get-PPD' = 0x400F,
  'CUPS-Get-Document' = 0x4027,
  'CUPS-Create-Local-Printer' = 0x4028,
}

enum jobCollationType {
  'other' = 0x01,
  'unknown' = 0x02,
  'uncollated-sheets' = 0x03,
  'collated-documents' = 0x04,
  'uncollated-documents' = 0x05
}

enum jobState {
  'pending' = 0x03,
  'pending-held' = 0x04,
  'processing' = 0x05,
  'processing-stopped' = 0x06,
  'canceled' = 0x07,
  'aborted' = 0x08,
  'completed' = 0x09
}

enum orientationRequested {
  'portrait' = 0x03,
  'landscape' = 0x04,
  'reverse-landscape' = 0x05,
  'reverse-portrait' = 0x06,
  'none' = 0x07 // ftp://ftp.pwg.org/pub/pwg/candidates/cs-ippjobprinterext3v10-20120727-5100.13.pdf
}

enum printQuality {
  'draft' = 0x03,
  'normal' = 0x04,
  'high' = 0x05
}

enum printState {
  'idle' = 0x03,
  'processing' = 0x04,
  'stopped' = 0x05
}


const enums = {
  'document-state': documentState,
  'fetch-status-code': statusCodes,
  finishings: finishings,
  'finishings-default': finishings,
  'finishings-ready': finishings,
  'finishings-supported': finishings,
  'operations-supported': operationsSupported,
  'cups-operations-supported': cupsOperationsSupported,
  'job-collation-type': jobCollationType,
  'job-state': jobState,
  'orientation-requested': orientationRequested,
  'media-source-feed-orientation': orientationRequested,
  'orientation-requested-default': orientationRequested,
  'orientation-requested-supported': orientationRequested,
  'print-quality': printQuality,
  'print-quality-default': printQuality,
  'print-quality-supported': printQuality,
  'output-device-job-state': printQuality,
  'printer-state': printState
};

export default enums;
