fetch("https://gist.githubusercontent.com/mihaistefan88/02524f70fde90c830ec5c81b394325c7/raw/91ae5ab2ab1a39325dd074bb594b4d58c2bb48a0/input.json")
    .then(response => response.json())
    .then(data => {
        if (window.location.href.indexOf("index.html") > -1) {
            Object.keys(data).forEach(function (item) {
                var structure = `<span><input type="checkbox" id="item_${data[item].id}" name="${data[item].domain_name}" class="competitor-site"> 
                                            <label for="item_${data[item].id}">
                                            <img src = "https://www.google.com/s2/favicons?domain=${data[item].domain_name}"> 
                                            ${data[item].domain_name}</label></span>`
                var container = document.getElementById('competitors-list');
                container.innerHTML += structure;
                console.log("foreach", data[item]);
            });

            document.getElementById("siteName").addEventListener("keyup", function getSiteName() {
                if (event.keyCode === 13) {
                    document.getElementById("submitSite").click();
                }
            });

            document.getElementById("submitSite").addEventListener("click", function getSiteName() {
                var inputValue = document.getElementById("siteName").value;
                var regex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/g;
                if (inputValue.match(regex)) {
                    console.log("dada");
                    document.getElementById("error_valid_url").classList.add("hidden");
                    var IdGenerator = function () {
                        return '_' + Math.random().toString(36).substr(2, 9);
                    };
                    var privateId = IdGenerator();
                    var newObj = {
                        id: privateId,
                        domain_name: inputValue
                    };
                    var existsInArr = false;
                    for (var item = 0; item < data.length; item++) {
                        var domainName = data[item].domain_name;
                        if (domainName.match(inputValue)) {
                            existsInArr = true;
                        }
                        console.log("for", data);
                    }
                    if (existsInArr === true) {
                        document.getElementById("error_duplicate").classList.remove("hidden");
                    } else {
                        document.getElementById("error_duplicate").classList.add("hidden");
                        data.push(newObj);
                        var structure = `<span><input type="checkbox" id="item_${newObj.id}" name="${newObj.domain_name}" class="competitor-site"> 
                                                    <label for="item_${newObj.id}">
                                                    <img src="//www.google.com/s2/favicons?domain=${newObj.domain_name}"> ${newObj.domain_name}
                                                    </label></span>`
                        var container = document.getElementById('competitors-list');
                        container.innerHTML += structure;
                    }
                } else {
                    document.getElementById("error_valid_url").classList.remove("hidden");
                    document.getElementById("error_duplicate").classList.add("hidden");
                    console.log("nunu");
                };
                selectedCompetitor();

            });
        }

        function selectedCompetitor() {
            $('.competitor-site').change(function () {
                if ($(this).is(":checked")) {
                    $(this).addClass("checked");
                } else {
                    $(this).removeClass("checked");
                }
                var numItems = $('.competitor-site.checked').length
                if (numItems > 4) {
                    document.getElementById("next_step").removeAttribute('disabled');
                    document.getElementById("third_step").classList.remove("active");
                    document.getElementById("fourth_step").classList.remove("inactive");
                    document.getElementById("fourth_step").classList.add("active");
                } else {
                    document.getElementById("next_step").disabled = true;
                    document.getElementById("fourth_step").classList.add("inactive");
                    document.getElementById("fourth_step").classList.remove("active");
                    document.getElementById("third_step").classList.add("active");
                }
            });
        }
        selectedCompetitor();
    });
