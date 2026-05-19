/**
 * UCMAS Summer Camp 2026 — Google Apps Script (Upsert version)
 *
 * Cấu trúc cột:
 * A: ID        B: Họ tên trẻ    C: Số điện thoại   D: Năm sinh
 * E: Kỳ đăng ký  F: Địa chỉ    G: Ghi chú         H: Nguồn
 * I: Thời gian đăng ký
 *
 * Logic: Nếu leadId đã tồn tại ở cột A → UPDATE dòng đó.
 *        Nếu chưa có → APPEND dòng mới.
 *
 * Hướng dẫn deploy:
 * 1. Mở Google Sheet → Extensions → Apps Script
 * 2. Xóa code cũ, paste toàn bộ code này vào
 * 3. Đặt tên hàm mặc định là doPost
 * 4. Deploy → New deployment → Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 5. Copy URL và dán vào Admin → Cài đặt → Google Sheets
 * 6. QUAN TRỌNG: Mỗi lần chỉnh code phải Deploy lại (New Deployment)
 */

var SHEET_NAME = 'Trang tính1' // Đổi nếu tên sheet khác

// Thứ tự cột (1-indexed)
var COL_ID         = 1  // A
var COL_CHILD_NAME = 2  // B
var COL_PHONE      = 3  // C
var COL_BIRTH_YEAR = 4  // D
var COL_SESSION    = 5  // E
var COL_ADDRESS    = 6  // F
var COL_NOTES      = 7  // G
var COL_SOURCE     = 8  // H
var COL_SUBMITTED  = 9  // I

var TOTAL_COLS = 9

function doPost(e) {
  try {
    var params = e.parameter

    var leadId     = params.leadId     || ''
    var childName  = params.childName  || ''
    var phone      = params.phone      || ''
    var birthYear  = params.birthYear  || ''
    var session    = params.session    || ''
    var address    = params.address    || ''
    var notes      = params.notes      || ''
    var source     = params.source     || 'Landing - Trại hè 2026'
    var submittedAt = params.submittedAt || ''

    // Skip test rows without a real ID
    if (!leadId && childName.indexOf('TEST') === 0) {
      return ok('skipped')
    }

    var ss    = SpreadsheetApp.getActiveSpreadsheet()
    var sheet = ss.getSheetByName(SHEET_NAME) || ss.getActiveSheet()

    // Ensure header row exists
    ensureHeader(sheet)

    var newRow = [leadId, childName, phone, birthYear, session, address, notes, source, submittedAt]

    // Try to find existing row by leadId (column A)
    if (leadId) {
      var lastRow = sheet.getLastRow()
      if (lastRow > 1) {
        var ids = sheet.getRange(2, COL_ID, lastRow - 1, 1).getValues()
        for (var i = 0; i < ids.length; i++) {
          if (String(ids[i][0]) === leadId) {
            // Found — update this row
            sheet.getRange(i + 2, 1, 1, TOTAL_COLS).setValues([newRow])
            return ok('updated')
          }
        }
      }
    }

    // Not found — append new row
    sheet.appendRow(newRow)
    return ok('created')

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON)
  }
}

function ensureHeader(sheet) {
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['ID', 'Họ tên trẻ', 'Số điện thoại', 'Năm sinh',
                     'Kỳ đăng ký', 'Địa chỉ', 'Ghi chú', 'Nguồn', 'Thời gian đăng ký'])
    // Style header
    var header = sheet.getRange(1, 1, 1, TOTAL_COLS)
    header.setFontWeight('bold')
    header.setBackground('#1a73e8')
    header.setFontColor('#ffffff')
  }
}

function ok(action) {
  return ContentService
    .createTextOutput(JSON.stringify({ ok: true, action: action }))
    .setMimeType(ContentService.MimeType.JSON)
}

// Test function — chạy thủ công để kiểm tra
function testUpsert() {
  var mockEvent = {
    parameter: {
      leadId: 'test-uuid-1234',
      childName: 'Nguyễn Test',
      phone: '0987654321',
      birthYear: '2015',
      session: 'Kỳ 1 - Tháng 6',
      address: 'Hà Nội',
      notes: '',
      source: 'Admin Test',
      submittedAt: '19/05/2026 10:00:00'
    }
  }
  var result = doPost(mockEvent)
  Logger.log(result.getContent())
}
