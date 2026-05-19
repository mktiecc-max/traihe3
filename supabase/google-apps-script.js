/**
 * UCMAS Summer Camp 2026 — Google Apps Script (Upsert version v2)
 *
 * Cấu trúc cột:
 * A: ID   B: Họ tên trẻ   C: Số điện thoại   D: Năm sinh
 * E: Kỳ đăng ký   F: Địa chỉ   G: Ghi chú   H: Nguồn   I: Thời gian đăng ký
 *
 * Logic:
 *  - Nếu leadId đã tồn tại ở cột A → UPDATE dòng đó
 *  - Nếu chưa có → APPEND dòng mới
 *  - Header được đảm bảo luôn ở dòng 1
 *
 * Hướng dẫn deploy:
 * 1. Mở Google Sheet → Extensions → Apps Script
 * 2. Xóa code cũ, paste toàn bộ code này vào
 * 3. Lưu (Ctrl+S)
 * 4. Deploy → New deployment → Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 5. Copy URL mới → Admin → Cài đặt → Lưu URL
 * 6. QUAN TRỌNG: Phải chạy hàm setupSheet() một lần để xóa data cũ và tạo header
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

var HEADERS = ['ID', 'Họ tên trẻ', 'Số điện thoại', 'Năm sinh',
               'Kỳ đăng ký', 'Địa chỉ', 'Ghi chú', 'Nguồn', 'Thời gian đăng ký']

// =============================================================
// HÀM CHÍNH — nhận POST từ Next.js
// =============================================================
function doPost(e) {
  try {
    var params = e.parameter

    var leadId      = params.leadId      || ''
    var childName   = params.childName   || ''
    var phone       = params.phone       || ''
    var birthYear   = params.birthYear   || ''
    var session     = params.session     || ''
    var address     = params.address     || ''
    var notes       = params.notes       || ''
    var source      = params.source      || 'Landing - Trại hè 2026'
    var submittedAt = params.submittedAt || ''

    var ss    = SpreadsheetApp.getActiveSpreadsheet()
    var sheet = ss.getSheetByName(SHEET_NAME) || ss.getActiveSheet()

    // Đảm bảo header đúng ở dòng 1
    ensureHeader(sheet)

    var newRow = [leadId, childName, phone, birthYear, session, address, notes, source, submittedAt]

    // Tìm dòng có leadId trùng ở cột A (bỏ qua dòng header = dòng 1)
    if (leadId) {
      var lastRow = sheet.getLastRow()
      if (lastRow > 1) {
        var ids = sheet.getRange(2, COL_ID, lastRow - 1, 1).getValues()
        for (var i = 0; i < ids.length; i++) {
          if (String(ids[i][0]) === leadId) {
            sheet.getRange(i + 2, 1, 1, TOTAL_COLS).setValues([newRow])
            return ok('updated')
          }
        }
      }
    }

    // Không tìm thấy → append dòng mới
    sheet.appendRow(newRow)
    return ok('created')

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON)
  }
}

// =============================================================
// Đảm bảo dòng 1 là header đúng
// Nếu dòng 1 không phải header (ví dụ có data cũ) → chèn header vào dòng 1
// =============================================================
function ensureHeader(sheet) {
  if (sheet.getLastRow() === 0) {
    // Sheet trống — append header
    sheet.appendRow(HEADERS)
    styleHeader(sheet)
    return
  }

  var firstCell = sheet.getRange(1, 1).getValue()
  if (String(firstCell) !== 'ID') {
    // Dòng 1 không phải header → chèn header vào đầu
    sheet.insertRowBefore(1)
    sheet.getRange(1, 1, 1, TOTAL_COLS).setValues([HEADERS])
    styleHeader(sheet)
  }
}

function styleHeader(sheet) {
  var header = sheet.getRange(1, 1, 1, TOTAL_COLS)
  header.setFontWeight('bold')
  header.setBackground('#1a73e8')
  header.setFontColor('#ffffff')
  header.setHorizontalAlignment('center')
}

function ok(action) {
  return ContentService
    .createTextOutput(JSON.stringify({ ok: true, action: action }))
    .setMimeType(ContentService.MimeType.JSON)
}

// =============================================================
// CHẠY HÀM NÀY MỘT LẦN để xóa sạch data cũ và tạo lại header
// Sau đó vào Admin web → Đồng bộ tất cả lead
// =============================================================
function setupSheet() {
  var ss    = SpreadsheetApp.getActiveSpreadsheet()
  var sheet = ss.getSheetByName(SHEET_NAME) || ss.getActiveSheet()

  // Xóa toàn bộ nội dung
  sheet.clearContents()

  // Tạo header
  sheet.appendRow(HEADERS)
  styleHeader(sheet)

  // Đặt độ rộng cột hợp lý
  sheet.setColumnWidth(1, 280)  // ID (UUID)
  sheet.setColumnWidth(2, 160)  // Họ tên trẻ
  sheet.setColumnWidth(3, 120)  // SĐT
  sheet.setColumnWidth(4, 80)   // Năm sinh
  sheet.setColumnWidth(5, 150)  // Kỳ đăng ký
  sheet.setColumnWidth(6, 150)  // Địa chỉ
  sheet.setColumnWidth(7, 150)  // Ghi chú
  sheet.setColumnWidth(8, 180)  // Nguồn
  sheet.setColumnWidth(9, 160)  // Thời gian

  Logger.log('Sheet đã được reset và tạo header thành công!')
}

// =============================================================
// Test function — chạy thủ công để kiểm tra doPost
// =============================================================
function testUpsert() {
  var mockEvent = {
    parameter: {
      leadId: 'test-uuid-abcd-1234',
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
