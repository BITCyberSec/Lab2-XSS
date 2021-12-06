// eslint-disable-next-line no-unused-vars
const sourceToSink = () => {
  const image = document.getElementById('source').files[0]
  const reader = new FileReader()
  reader.addEventListener('load', () => {
    if (reader.result.length > 7500) {
      document.getElementById('errmsg').style.display = 'block'
      return
    }
    window.location.href = `/fakeimgur/${encodeURIComponent(reader.result)}`
  }, false)
  reader.readAsDataURL(image)
}
