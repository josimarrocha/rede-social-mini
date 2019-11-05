export default function (time, place) {
  let hour = new Date(time).getHours()
  let minutes = new Date(time).getMinutes()

  minutes = minutes < 10 ? `0${minutes}` : minutes
  hour = hour < 10 ? `0${hour}` : hour

  let day = new Date(time).getDate()
  let month = new Date(time).getMonth()
  let year = new Date(time).getFullYear()
  if (place === 'posts') {
    return `${hour}:${minutes}`
  }
  if (day === new Date().getDate()) {
    return `Hoje ${hour}:${minutes}`
  }
  if ((new Date().getDate() - day) > 1 || new Date().getMonth() + 1 > month + 1) {
    return `${day < 10 ? `0${day}` : day}/${month < 10 ? month + 1 : month}/${year}`
  }
  if ((new Date().getDate() - day) === 1) {
    return `Ontem ${hour}:${minutes}`
  }
}