const compData = {"watermark":"<i>FakeCompany</i>"};
showForm = () => document.getElementById("card").style.display = 'none'
showCard = (args) => {
    document.getElementById("form").style.display = 'none';
    let input = deparam(args);
    console.log(input.toString());
    document.getElementById("name").innerText = input.name;
    document.getElementById("profession").innerText = input.profession;
    document.getElementById("watermark").innerHTML = compData.prod ? compData.test : compData.watermark
}
initSite = () => {args=window.location.href.split('?')[1];args = typeof args == 'undefined' ? showForm() : showCard(args)}
