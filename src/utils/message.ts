import { ElMessage, ElMessageBox } from 'element-plus'

function _showMsg(msg: string, type = 'success', duration = 2000) {
  ElMessage({
    message: msg,
    type: type,
    duration: duration,
    showClose: duration < 1,
    grouping: true
  })
}

export function showMsg(msg: string, duration = 2000) {
  _showMsg(msg, 'success', duration)
}

export function showErr(msg: string, duration = 3000) {
  _showMsg(msg, 'error', duration)
}

export function showWarning(msg: string, duration = 3000) {
  _showMsg(msg, 'warning', duration)
}

export function showConfirm(title: string, callback: Function) {
  ElMessageBox.confirm(title, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消'
  })
    .then(() => {
      callback()
    })
    .catch(() => {})
}
