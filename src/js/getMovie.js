
var method  = "POST";
var async   =  true;
var url     = "movieExtract";

document.addEventListener('DOMContentLoaded', function ()
    {


        /*---------------Favorites && Add to Favorites in GetMovie------------------*/

        var addSign = document.querySelector('span.favor');
        var regexF   = /favorites=1/.exec(window.location.search);

        if (addSign && ses && ses['id'] && movies && movies['idM'])
            {
                //movies : variable in GetMovie
                //ses : variable in index

                var methodFavourite = "idFavourite=";


                var getId = GetMovie.requestPromise(method, url, async, methodFavourite, ses['id']);

                getId.then(function (data)
                        {
                            processFavors(data);
                        })
                    .catch(function (error)
                        {
                            alert(error);
                        });
            }
        else if (regexF && ses && ses['id'])
            {
                ses; //variable in index

                var movEls = document.querySelectorAll('.movieCont .movie_index');

                if(movEls.length > 0)
                    {
                        movEls.forEach(function (el)
                            {
                                var delEl           = document.createElement('span');
                                    delEl.className = 'delMeFav';
                                    delEl.innerText = '❌';
                                    delEl.setAttribute('title', 'Remove from Favorites');
                                el.insertAdjacentElement('afterbegin', delEl);


                                var hrefCinema = el.childNodes[6].childNodes[0].href;
                                var idfCinema  = /id=(\d+)/.exec(hrefCinema)[1];

                                delEl.addEventListener('click', function (ev)
                                    {
                                        var methodTitle = "dellFavor=";

                                        var delMov      = requestPromise(method, url, async, methodTitle, [ses['id'], idfCinema]);

                                        delMov.then(function (data)
                                                {
                                                    window.location.reload();
                                                })
                                            .catch(function (error)
                                                {
                                                    alert(error);
                                                });
                                    });
                            });
                    }
                else
                    {

                        var parentEl_F = document.querySelector( '.movieCont' );
                        var delEl      = document.createElement('span');
                            delEl.innerText = 'No Data';

                        parentEl_F.insertAdjacentElement('afterbegin', delEl);

                        // Bad ! has to be improved....
                        var parentEl_F = document.querySelector( '.container .pagination' );
                            parentEl_F.style.display = 'none';

                    }
            };
        function processFavors(data)
            {
                if (addSign)
                    {

                        var check = Object.keys(data).some(function (val)
                            {
                                return data[val].idM === movies['idM'];
                            });

                        if (check)
                            {
                                addSign.className += ' fas fa-heart';
                                addSign.setAttribute('title', 'Remove from Favorites');
                            }
                        else
                            {
                                addSign.className += ' far fa-heart';
                                addSign.setAttribute('title', 'Add to Favorites');
                            }

                        addSign.addEventListener('click', function (ev)
                            {
                                var txtClass = ev.target.className;

                                if (txtClass.indexOf('fas fa-heart') != -1)
                                    {
                                        addSign.className = txtClass.replace(/fas/, 'far');
                                        addSign.setAttribute('title', 'Add to Favorites');

                                        var methodFavourite = 'dellFavor=';
                                        GetMovie.requestPromise(method, url, async, methodFavourite, [ses['id'], movies['idM']]);
                                    }
                                else
                                    {
                                        addSign.className = txtClass.replace(/far/, 'fas');
                                        addSign.setAttribute('title', 'Remove from Favorites');

                                        var methodFavourite = 'addFavor=';
                                        GetMovie.requestPromise(method, url, async, methodFavourite, [ses['id'], movies['idM']]);
                                    };
                            });
                    }
            }
    });

class GetMovie
    {
        constructor(id, movies, countries, envData, ses)
            {
                this.id        = id;
                this.movies    = movies;
                this.countries = countries;
                this.envData   = envData;
                this.ses       = ses;

            };

        //---inner functions
        static requestPromise(meth, ul, asyn)
            {
                var methodName  = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
                var searchValue = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
                var loading     = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;

                var csrf_token  = document.querySelector("meta[name='csrf-token']").getAttribute('content');

                return new Promise(function (resolve, reject) {

                    var xhr = new XMLHttpRequest();
                    xhr.open(meth, ul, asyn);
                    xhr.onload = function ()
                        {

                            if (xhr.readyState == 4 && xhr.status == 200)
                                {

                                    searchValue != '' ? resolve(JSON.parse(xhr.responseText)) : resolve('');
                                }
                            else
                                {
                                    reject(xhr.statusText);
                                }
                        };

                    xhr.onloadstart = function ()
                        {
                            if (loading != null)
                                {
                                    loading.innerText     = 'Loading...';
                                    erMessage.style.color = 'green';
                                };
                        };

                    xhr.onerror = function ()
                        {
                            reject(xhr.statusText);
                        };
                    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                    xhr.setRequestHeader('X-CSRF-TOKEN', csrf_token );
                    xhr.send(methodName + searchValue);
                });
            }

        static showHide(area_innerHTML, event, element)
            {
                var closeElement = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '&times;';

                var worcArea = area_innerHTML;
                // var targName = event.target.parentNode.innerHTML;
                var targName = event.target.innerHTML ;
                var index_Of = worcArea.indexOf(targName);

                if (index_Of != -1 && event.target != closeElement && !element.clientHeight)
                    element.style.cssText = 'display:block;';

                else if (index_Of != -1 && event.target != closeElement  && element.innerHTML.indexOf(targName)!= -1)
                    element.style.cssText = 'display:block;';

                else
                    element.style.cssText = 'display:none;';
            }
        static hideShow(btn, element)
            {
                var closeElement = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
                var inhtml       = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;


                var htmlv;
                var close_html;

                document.addEventListener('click', display);

                function display(e)
                {

                    !inhtml                          ? htmlv      = element.outerHTML : htmlv = element.innerHTML;
                    typeof closeElement === 'string' ? close_html = closeElement      : closeElement;


                    if (!element.clientHeight && e.target === btn)
                        {
                            element.style.cssText = 'display : block ; ';
                        }
                    else if (e.target === closeElement)
                        {
                            element.style.cssText = 'display : none';
                        }
                    else if (close_html && close_html.indexOf(e.target.innerHTML) != -1)
                        {
                            element.style.cssText = 'display : none';
                        }
                    else if (htmlv.indexOf(e.target.outerHTML) != -1 && closeElement != 'dont')
                        {
                            element.style.cssText = 'display : block';
                        }
                    else
                        {
                            element.style.cssText = 'display : none';
                        }
                }
            };

        static criateUlLi_ForServerUrl(data)
            {
                var serieFrag = document.createDocumentFragment();

                for(var button of data)
                  {

                      // Create Buttons
                      // ================
                      var regx       = /((http:\/\/)|(https:\/\/)|\/\/)(w{3}.)?([a-zA-Z]+)/g;
                      var serverName = regx.exec(button);

                      if(serverName)
                        {
                            var serverDefaultBut       = document.createElement("button");

                            serverDefaultBut.innerHTML =  serverName[5];
                            serverDefaultBut.setAttribute("class", "button_server");



                            // Attach button to li
                            // ===================
                            var li_ForButton = document.createElement("li");
                            li_ForButton.appendChild(serverDefaultBut);

                            serieFrag.appendChild(li_ForButton);
                        }
                  }

                if(serieFrag)
                  {
                      var el       = document.createElement("ul");
                          el.style ='list-style-type:none;'
                          el.appendChild(serieFrag);
                      document.querySelector('.server_list').appendChild(el);
                  }

                // Even listener
                 if (document.querySelector('.server_list'))
                    {
                        var button = document.querySelectorAll('li > .button_server');

                        button[0].style.backgroundColor = 'rgb(242, 76, 76)';//Red
                        button[0].style.color           = 'rgb(241, 247, 241)';//Withe

                        for(var i = 0 ; i < button.length; i++)
                        {

                            button[i].addEventListener('click',function(e)
                                {

                                    for(var i = 0 ; i < data.length; i++)
                                    {
                                            var regx  = /((\/\/)|(http:\/\/)|(https:\/\/))(w{3}.)?([a-zA-Z]+)/g;
                                            var serverName = regx.exec(data[i]);

                                            if(serverName && serverName[6] == e.target.innerHTML)
                                                {
                                                    document.querySelector('.frame')
                                                            .setAttribute("src",data[i]);


                                                    button.forEach(function(e)
                                                        {
                                                            e.style.backgroundColor = 'rgb(244, 238, 238)';
                                                            e.style.color           = 'black';
                                                        });
                                                    button[i].style.backgroundColor = 'rgb(242, 76, 76)';//Red
                                                    button[i].style.color           = 'rgb(241, 247, 241)';//Withe
                                                }

                                    }


                                });
                            }

                    }
            }

        static createReference(data, elem, all_a)
            {
                //************  Search from Info section by Referebce  ************
                var val = data;
                var element = document.querySelector(elem);

                val.forEach(function (e) {
                    var a = document.createElement('a');
                    a.href = 'index.php?' + element.parentNode.className + '=' + e;
                    a.innerText = e;
                    a.style.cssText = 'cursor : pointer; text-decoration : none;';

                    element.appendChild(a);
                });

                var all_a = document.querySelectorAll(all_a);

                for (var i = 0; i < all_a.length - 1; i++)
                    {
                        if (all_a.length > 1) all_a[i].insertAdjacentHTML('afterend', ' | ');
                    }
            }




        // frame and Serie Handler-/-Trailer

        static url_to_frame(movies, data)
            {
                var movies = movies;
                var data   = data;


                // Default SRC value
                var defaulrSRC = [];

                for (var i = 0; i < data.length; i++)
                    {
                        if (data[i]['serverUrl'])
                            {
                                defaulrSRC.push( { [ data[i]['serie'] ] : data[i]['serverUrl'] } );
                            }

                    }


                if (defaulrSRC[0][0])
                    {
                        document.querySelector('.frame').src = defaulrSRC[0][0];
                    }
                if (defaulrSRC[0]['null'])
                    {
                        document.querySelector('.frame').src = defaulrSRC[0]['null'];
                    }

                // ===========================================

                // if tv-series
                if (data[data.length - 1]['serie'] != null)
                    {

                        var temp = [];
                        var globalArr = [];

                        var element = document.createElement("div");
                            element.setAttribute("class", "series");

                        var docFrag = document.createDocumentFragment();

                        // Buttons for Seris and Formating of array
                        // ===============================
                        for (var i = 0; i < data.length; i++)
                            {

                                var serverArr = [];

                                if ( (data[i]['serie'] || data[i]['serie']!=null)  && temp.indexOf(data[i]['serie']) && temp.indexOf(data[i]['serie']) < 1)
                                    {

                                        temp.push(data[i]['serie']);

                                        var serieNum = parseInt(data[i]['serie'])+1;

                                        var subElem = document.createElement("li");
                                            subElem.appendChild(document.createElement("BUTTON")).appendChild(document.createTextNode('Serie: ' + serieNum));
                                            subElem.setAttribute("class", "button_series");
                                            subElem.setAttribute("n", data[i]['serie']);

                                        docFrag.appendChild(subElem);

                                        for (var j = 0; j < data.length; j++)
                                            {

                                                if (data[i]['serie'] == data[j]['serie'])
                                                    {

                                                        serverArr.push(data[j]['serverUrl']);
                                                    }
                                            }

                                        globalArr.push({ [data[i]['serie']] : serverArr });
                                    }
                            }

                        var defaulrSRC = Object.assign({}, ...globalArr);


                        var ulSeries               = document.createElement("ul");
                            ulSeries.style.cssText = "list-style-type:none;";

                        element.insertAdjacentHTML('afterbegin', '<span>&#9776; Episode</span>');
                        element.appendChild(ulSeries).appendChild(docFrag);
                        document.querySelector('.mediaWrapper').appendChild(element);

                        // Default server buttons for tv-series
                        //==============================

                        GetMovie.criateUlLi_ForServerUrl(defaulrSRC[1]);

                        // Event listener for serie buttons
                        //=========================
                        if ( document.querySelector('.series') )
                            {
                                var but = document.querySelectorAll('.button_series > button');
                                but[0].style.backgroundColor = 'rgb(122, 198, 127)'; //Green
                                but[0].style.color = 'rgb(241, 247, 241)'; //Withe

                                for (var i = 0; i < but.length; i++)
                                {
                                    but[i].addEventListener('click', function (e)
                                    {
                                        but.forEach(function (e)
                                            {
                                                e.style.backgroundColor = 'rgb(244, 238, 238)';
                                                e.style.color           = 'black';
                                            });
                                        e.target.style.backgroundColor = 'rgb(122, 198, 127)'; //Green
                                        e.target.style.color           = 'rgb(241, 247, 241)'; //Withe

                                        // remove old Server Buttons
                                        var removeButton = document.querySelector('.server_list ul');
                                        if (removeButton) removeButton.remove();

                                        var n = e.target.parentNode.getAttribute("n");

                                        // New  Server buttons for tv-series
                                        if (defaulrSRC[n] && defaulrSRC[n] != '')
                                            {
                                                GetMovie.criateUlLi_ForServerUrl( defaulrSRC[n] );
                                            }


                                        // Defaulr SRC for clicked element
                                        //=================================
                                        if(defaulrSRC[n])
                                            {
                                                var temp = [];
                                                for(var url of defaulrSRC[n])
                                                    {
                                                        if(url)
                                                            temp.push(url);
                                                    }

                                                document.querySelector('.frame').setAttribute("src",temp[0] );
                                            }
                                    });
                                }
                            }
                    }
                // if Movie
                else
                    {
                        var serverArr = [];

                        for (var i = 0; i < data.length; i++)
                            {
                                if (data[i]['serverUrl']) serverArr.push(data[i]['serverUrl']);
                            }

                        // Servers for Movie
                        //==============================
                        GetMovie.criateUlLi_ForServerUrl(serverArr);
                    }
                // ----Trailer Button Section----
                if (document.querySelector('.trailerButton'))
                    {
                        if (movies['trailer'])
                            {

                                var button               = document.querySelector('.trailerButton');
                                    button.style.cssText = 'display: block;';

                                document.addEventListener('click', function (e)
                                    {
                                        var eltShow = document.querySelector('.trailerWrapper');
                                        var wArea   = document.querySelector('.trailer iframe').innerHTML + document.querySelector('.trailerButtonWrapper').innerHTML;
                                        var close   = document.querySelector('.trailerClose');

                                        if (e.target == button || eltShow.offsetWidth > 0)
                                            {
                                                document.querySelector('.trailer iframe').src = movies['trailer'];
                                                GetMovie.showHide(wArea, e, eltShow, close); //Unuversal Functions
                                            }

                                        if (eltShow.offsetWidth <= 0)
                                            document.querySelector('.trailer iframe').src = '';
                                    });
                            }
                    }

            }
        //---------------------

        // --------GetMovie ADM Features--------
        static formSubmitAdmn(formData, meth, ul, asyn)
            {

                return new Promise(function (resolve, reject)
                {
                    var csrf_token  = document.querySelector("meta[name='csrf-token']").getAttribute('content');

                    var xhr = new XMLHttpRequest();

                    xhr.open(meth, ul, asyn);

                    xhr.onload = function ()
                        {

                            if (xhr.readyState == 4 && xhr.status == 200)
                                {
                                    resolve(xhr.responseText);
                                }
                            else
                                {
                                    reject(xhr.statusText);
                                }
                        };

                    xhr.onerror = function ()
                        {
                            reject(xhr.statusText);
                        };
                    xhr.setRequestHeader('X-CSRF-TOKEN', csrf_token );
                    // xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                    // xhr.setRequestHeader("Content-type", "multipart/form-data");
                    xhr.send(formData);
                });
            }
        static sesAd(ses, arrMovie)
            {
                if (ses['id'] && ses['userType'] === 'Admin')
                    {

                        // Functions
                        var createAdminElement = function createAdminElement(el, kay, div)
                            {

                                if ( (ses['id'] && typeof( el ) !== 'object' ) && ses['userType'] === 'Admin' )
                                    {

                                        var input       = document.createElement('input');
                                            input.name  = kay + '[]';
                                            input.type  = "text";
                                            input.value = el;
                                        kay == 'idM' ? input.setAttribute('readonly', 'true') : false;

                                        var del_El           = document.createElement('label');
                                            del_El.className = 'del_Ell';
                                            del_El.innerText = '-';

                                        var br = document.createElement('br');

                                        div.appendChild(br);
                                        if (kay == 'servers' || kay == 'genres' || kay == 'director' || kay == 'artists')
                                            div.appendChild(del_El);
                                        div.appendChild(input);
                                    }
                                else if ( typeof( el ) === 'object' )
                                {

                                    if (!el['serie'])
                                        {

                                            var input       = document.createElement('input');
                                                input.name  = kay + '[]';
                                                input.type  = "text";
                                                input.value = el['serverUrl'];

                                            var del_El           = document.createElement('label');
                                                del_El.className = 'del_Ell';
                                                del_El.innerText = '-';

                                            var br = document.createElement('br');

                                            div.appendChild(br);
                                            div.appendChild(del_El);
                                            div.appendChild(input);
                                        }
                                    else
                                        {
                                            var wraper = document.createElement('div');

                                            var val   = kay + 1;
                                            var serie           = document.createElement('label');
                                                serie.innerText = 'serie ' + val + ' : ';

                                            var add_El           = document.createElement('label');
                                                add_El.className = 'add_Ell';
                                                add_El.innerText = '+';

                                            var del_El           = document.createElement('label');
                                                del_El.className = 'del_Ell';
                                                del_El.innerText = '-';

                                            serie.appendChild(add_El);
                                            wraper.appendChild(serie);

                                            el['serie'].forEach(function (e)
                                                {
                                                    var input       = document.createElement('input');
                                                        input.name  = 'serie ' + kay + '[]';
                                                        input.type  = "text";
                                                        input.value = e;

                                                    var del_El           = document.createElement('label');
                                                        del_El.className = 'del_Ell';
                                                        del_El.innerText = '-';

                                                    var br = document.createElement('br');

                                                    wraper.appendChild(br);
                                                    wraper.appendChild(del_El);
                                                    wraper.appendChild(input);
                                                });

                                            div.appendChild(wraper);
                                            wraper.insertAdjacentHTML('afterend', '<br>');
                                            div.insertBefore(del_El, wraper);
                                        }
                                }
                            };

                        var anchor = document.querySelector('.cinema');

                        var container           = document.createElement('div');
                            container.className = 'Admin_M_Data';

                        var btn               = document.createElement('div');
                            btn.className     = 'Admin_M_btn';
                            btn.innerText     = 'Redact';
                            btn.style.cssText = 'cursor:pointer';

                        var selectWrapper               = document.createElement('div');
                            selectWrapper.style.cssText = 'display:none';
                            selectWrapper.className     = 'selectWrapper';

                        var form = document.createElement('form');

                        var submit       = document.createElement('input');
                            submit.type  = 'submit';
                            submit.value = 'Change All';

                        container.appendChild(btn);

                        selectWrapper.appendChild(form);
                        container.appendChild(selectWrapper);
                        document.querySelector('body').insertBefore(container, anchor);

                        // Prepare Araay for TV-SERIS
                        var varForSeris = [];

                        arrMovie['servers'].map(function (e, kay)
                            {
                                if ( e['serie'] || e['serie']!=null  && varForSeris.indexOf(e['serie']) === -1 )
                                    {
                                        varForSeris[e['serie']] = [];
                                    }
                            });

                        arrMovie['servers'].map(function (e)
                            {

                                if ( e['serie'] || e['serie']!=null )
                                    {

                                        varForSeris[e['serie']].push(e['serverUrl']);

                                    }
                            });

                        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

                        Object.keys(arrMovie).forEach(function (kay)
                            {

                                var subWrapper           = document.createElement('div');
                                    subWrapper.className = 'userAD_' + kay;

                                var label           = document.createElement('label');
                                    label.innerText = kay + ': ';

                                var add_El           = document.createElement('label');
                                    add_El.className = 'add_Ell';
                                    add_El.innerText = '+';

                                if ( kay == 'servers' || kay == 'genres' || kay == 'director' || kay == 'artists' )
                                    {
                                        label.appendChild(add_El);
                                    }
                                subWrapper.appendChild(label);
                                form.appendChild(subWrapper);

                                if ( typeof( arrMovie[kay] ) === 'object' )
                                    {

                                        arrMovie[kay].forEach(function (el, index)
                                            {

                                                if (el['serie'] || el['serie']!=null)
                                                    {

                                                        var obKays = Object.keys(varForSeris);

                                                        if (obKays.indexOf('' + index + '') != -1)
                                                            {
                                                                var arVal = { 'serie': varForSeris[index] };

                                                                createAdminElement(arVal, index, subWrapper);
                                                            }
                                                    }
                                                else
                                                    {
                                                        createAdminElement(el, kay, subWrapper);
                                                    }
                                            });
                                    }
                                else
                                    {
                                        createAdminElement(arrMovie[kay], kay, subWrapper);
                                    }
                            });

                        form.appendChild(submit);
                    }

                if (form)
                    {
                        var submitBtn = document.querySelector('.selectWrapper > form > [type = submit]');

                        submitBtn.onclick = function (e)
                            {
                                e.preventDefault();

                                var meth = 'POST';
                                var asyn = true;
                                var ul   = 'adminChange';

                                var formEl   = document.querySelector('.selectWrapper > form');
                                var formData = new FormData(formEl);

                                var gerMov   = GetMovie.formSubmitAdmn(formData, meth, ul, asyn);

                                gerMov.then(function (data)
                                        {
                                            window.location.reload();
                                            // console.log(data) ;
                                            // console.log(JSON.parse(data) );
                                        })
                                    .catch(function (error)
                                        {
                                            alert(error);
                                        });
                            };
                    }
            }

        // ADM Panel
        static admPan ()
            {
                /*---------------Admin Pannel in GetMovie------------------*/
                    if (document.querySelector('.Admin_M_btn'))
                        {
                            var btn = document.querySelector('.Admin_M_btn');
                            var el  = document.querySelector('.selectWrapper');

                            GetMovie.hideShow(btn, el);
                        }

                    var del = document.querySelectorAll('.del_Ell');
                    var add = document.querySelectorAll('.add_Ell');

                    if (del)
                        {
                            del.forEach(function (el)
                                {

                                    el.setAttribute('title', 'Delete element');
                                    el.addEventListener('click', delEl);
                                });
                        }

                    if (add)
                        {
                            add.forEach(function (el)
                                {
                                    el.setAttribute('title', 'Add element');
                                    el.addEventListener('click', addEl);
                                });
                        }
                    function addEl(ev)
                        {
                            var parent  = ev.target.parentNode.parentNode;
                            var nodes   = ev.target.parentNode.parentNode.childNodes;
                            var tempEl  = [];
                            var tempDiv = [];
                            var count   = 0;


                            nodes.forEach(function (el, index)
                                {

                                    if (el.nodeName === 'INPUT')
                                        {
                                            tempEl['inpt'] = true;
                                        }
                                    else if (el.nodeName === 'DIV')
                                        {
                                            count += 1;
                                            tempDiv['els'] = true;
                                        }

                                });


                            if (tempEl['inpt'])
                                {

                                    var k   = /.*(?=:)/.exec(nodes[0].innerText)[0];
                                    var num = /\d+/.test(k);

                                    if (num)
                                        {
                                            var num = parseInt(/\d+/.exec(k)[0]);
                                            k       = k.replace(/\d+/, num - 1);
                                        }
                                    addInput(k, parent);
                                }
                            else if (tempDiv['els'])
                                {
                                    var delElDiv = del[0].cloneNode(true);
                                    delElDiv.addEventListener('click', delEl);

                                    parent.appendChild(delElDiv);
                                    createDiv(count, parent);
                                };

                            function addInput(kay, div)
                                {
                                    var input       = document.createElement('input');
                                        input.name  = kay + '[]';
                                        input.type  = "text";
                                        input.value = '';

                                    var del_El           = document.createElement('label');
                                        del_El.className = 'del_Ell';
                                        del_El.innerText = '-';

                                    var br = document.createElement('br');

                                    div.appendChild(br);
                                    div.appendChild(del_El);
                                    div.appendChild(input);
                                    del_El.addEventListener('click', delEl);
                                }
                            function createDiv(kay, div)
                                {
                                    var wraper = document.createElement('div');

                                    var val    = kay + 1;
                                    var serie           = document.createElement('label');
                                        serie.innerText = 'serie ' + val + ' : ';

                                    var add_El           = document.createElement('label');
                                        add_El.className = 'add_Ell';
                                        add_El.innerText = '+';

                                    var del_El           = document.createElement('label');
                                        del_El.className = 'del_Ell';
                                        del_El.innerText = '-';

                                    var input       = document.createElement('input');
                                        input.name  = 'serie ' + kay + '[]';
                                        input.type  = "text";
                                        input.value = '';

                                    var br = document.createElement('br');

                                    serie.appendChild(add_El);
                                    wraper.appendChild(serie);

                                    wraper.appendChild(br);
                                    wraper.appendChild(del_El);
                                    wraper.appendChild(input);

                                    div.appendChild(wraper);
                                    wraper.insertAdjacentHTML('afterend', '<br>');
                                    add_El.addEventListener('click', addEl);
                                    del_El.addEventListener('click', delEl);
                                }
                        }
                    function delEl(ev)
                        {

                            var parent = ev.target.parentNode;
                            var nodes  = ev.target.parentNode.childNodes;
                            var elem   = ev.target.nextSibling;

                            if (elem.nodeName === 'INPUT') var countInputs = Object.keys(nodes).filter(function (el)
                                {
                                    // return el.nodeName === 'INPUT';
                                    return nodes[el].nodeName === 'INPUT';
                                });
                            if (elem.nodeName === 'DIV') var countInputs = Object.keys(nodes).filter(function (el)
                                {
                                    // return el.nodeName === 'DIV';
                                    return nodes[el].nodeName === 'INPUT';
                                });

                            if (countInputs.length > 1)
                                {
                                    elem.remove();
                                    ev.target.previousSibling.remove();
                                    ev.target.remove();
                                };
                        }
            };

        // Movie Counter
        static viewCounter(movie, envData)
            {
                test_Ids = false;

                if(envData['ids'])
                    var test_Ids = envData['ids'].some( function(el){ return el == movie.idM } );



                if ( movie.title && movie.idM &&  !test_Ids  )
                    {
                        var val        = movie.idM;
                        var methodName = 'idMovieCounter=';

                        var emAnsver   = GetMovie.requestPromise(method, url, async, methodName, val);

                        // Usless for a time being
                        emAnsver.then(function (data)
                                    {
                                        if( window.sessionStorage )
                                            {
                                                sessionStorage.ipVal = envData.ip;
                                            }
                                    })
                                .catch(function (error)
                                    {
                                        console.log(error);
                                    });
                    };

            };

        //--[ All Promise ]
        getMovieD ( )
            {
                let asreqServs =  GetMovie.requestPromise(method, url, async, "get_servs_id="  , this.id);
                let asDirs     =  GetMovie.requestPromise(method, url, async, "get_dir_id="    , this.id);
                let asArtists  =  GetMovie.requestPromise(method, url, async, "get_Artists_id=", this.id);
                let asGenre    =  GetMovie.requestPromise(method, url, async, "get_Genre_id="  , this.id);


                Promise.all([
                                asreqServs.catch(function(error){ return console.log(error) }),
                                asDirs    .catch(function(error){ return console.log(error) }),
                                asArtists .catch(function(error){ return console.log(error) }),
                                asGenre   .catch(function(error){ return console.log(error) })
                            ])
                        .then(function (resp)
                            {
                                    var sr = resp[0];
                                    var dr = resp[1].map(function(e){return e.name.trim()});
                                    var ar = resp[2].map(function(e){return e.artist.trim()});
                                    var ge = resp[3].map(function(e){return e.genre.trim()});

                                // Country-Director-Artists handler

                                //Country
                                    var country   = this.countries;
                                        country   = country.split(',').map(function(item) {return item.trim();});
                                    var countryEl = 'dl.country > dd';
                                    var all_a_C   = 'dl.country > dd > a';

                                    //Director
                                    var director  = dr;
                                    var dirEl     = 'dl.director > dd';
                                    var all_a_Dir = 'dl.director > dd > a';

                                    //Artists
                                    var artists   = ar;
                                    var artEl     = 'dl.artists > dd';
                                    var all_a_Art = 'dl.artists > dd > a';

                                    //TO DO ....Genre
                                    var genre       = ge;
                                    var genreEl     = 'dl.genres > dd';
                                    var all_a_Genre = 'dl.genres > dd > a';



                                    GetMovie.createReference(country , countryEl, all_a_C);
                                    GetMovie.createReference(director, dirEl , all_a_Dir);
                                    GetMovie.createReference(artists, artEl , all_a_Art);
                                    GetMovie.createReference(genre, genreEl , all_a_Genre);
                                //Frame handler
                                    //--------- sort servers and Bad Servers
                                    sr.sort(function(a, b)
                                        {
                                            if ( /openload|oload/.test(a['serverUrl']) )
                                                {
                                                    return 1
                                                }
                                            else if ( /openload|oload/.test(b['serverUrl']) )
                                                {
                                                    return -1
                                                }
                                            else
                                                {
                                                    return 0
                                                }
                                        });

                                    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                                    // process sorted servers and frames
                                    GetMovie.url_to_frame( this.movies, sr)
                                //User Features

                                    var allData             = this.movies;
                                        allData['servers']  = sr;
                                        allData['director'] = dr;
                                        allData['artists']  = ar;
                                        allData['genres']   = ge;

                                    // ADMN

                                    GetMovie.sesAd( this.ses, allData);
                                    GetMovie.admPan();

                                    // Counter
                                    GetMovie.viewCounter( allData,  this.envData );

                            }.bind(this))
                        .catch(function (error)
                            {
                                console.log(error);
                            });
            };
    }

new GetMovie( id, movies, countries, envData, ses ). getMovieD ( );



