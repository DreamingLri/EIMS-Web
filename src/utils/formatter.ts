export function formatDate(row: any, col: any) {
  let data = row[col.property];
  if (data == null) return null;
  let date_time = new Date(data);
  return date_time.toLocaleDateString();
}

export function formatStatus(row: any, col: any) {
  let data = row[col.property];
  if (data == null) return null;
  return data === 1 ? "录属部门" : "离开部门";
}

export function formatGender(row: any, col: any) {
  let data = row[col.property];
  if (data == null) return null;
  if (data == 0) return "男"
  else if (data == 1) return "女"
  else return "其它"
}
