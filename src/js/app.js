import { logo } from './logo';
import { log } from 'three';



// require('./bootstrap');


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var method       = "POST";
var url          = "movieExtract";
var urlForSearch = 'search.php';
var async        =  true;
var searchFile   = 'index.php';

document.addEventListener('DOMContentLoaded', function ()
{
        // ------Search Request Section---------
        // -------------------------------------

            var elAdd = document.querySelector('.search-suggest');

            if( elAdd )
                {
                    var ulAdd = elAdd.appendChild(document.createElement('ul'));
                        ulAdd.style.cssText = "list-style-type: none;";
                }


            //----------Search display on Focus-----------
            document.querySelectorAll('.inputCont').forEach(function (el)
                {
                    el.addEventListener('input', function ()
                        {
                            searchSugest();
                        });
                });

            window.addEventListener('resize', function ()
                {
                    searchSugest();
                });
            //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~



            function searchSugest()
                {
                    var display = undefined;
                    document.querySelectorAll('.form-control').forEach(function (el)
                        {
                            if (el.offsetParent)
                                {
                                    display = el;
                                }
                        });

                    var inputArea = undefined;
                    document.querySelectorAll('.inputCont').forEach(function (el)
                        {
                            if (el.offsetParent)
                                inputArea = el;
                        });

                    if (display && elAdd )
                        {
                            elAdd.style.cssText = 'display:block;';

                            display.onfocus = function ()
                                {
                                    elAdd.style.cssText = 'display:block;';
                                };

                            display.onblur = function ()
                                {

                                    document.addEventListener('click', function (e)
                                        {
                                            var worcArea = elAdd.innerHTML + inputArea.innerHTML;
                                            showHide(worcArea, e, elAdd); //Universal Function
                                        });
                                };
                        }
                    else
                        {

                            if ( elAdd )
                                elAdd.style.cssText = 'display:none;';
                        }
                };

            function li_Old_Delete(elAdd, data)
                {
                    var length = data.length;

                    //----Delete old search----
                    if (data != '')
                        {

                            var liCount = document.querySelectorAll('.search-suggest ul li').length - 1;
                            if (liCount)
                                {
                                    for (var i = 0; i < liCount - length; i++)
                                        {
                                            document.querySelector('.search-suggest ul li').remove();
                                        }
                                }
                        }
                    else
                        {

                            var liCount = document.querySelectorAll('.search-suggest ul li');

                            liCount.forEach(function (elementx)
                                {
                                    elementx.remove();
                                });

                            // elAdd.style = 'display:none;';
                        }
                };

            function create_Element(elAdd, ulAdd, getData, urlForSearch)
                {
                    //----Create elements---
                    for (var i = 0; i <= getData.length; i++)
                        {
                            if (getData[i])
                                {

                                    var liVAr     = document.createElement('li');

                                    var aVarIMG   = document.createElement('a');

                                    var dVar      = document.createElement('div');
                                    var aVarTitle = document.createElement('a');
                                    var pVarTime  = document.createElement('p');
                                    var pVarYear  = document.createElement('p');

                                    var noImg = "https://m.media-amazon.com/images/G/01/imdb/images/nopicture/medium/film-3385785534._CB483791896_.png";
                                    var sImg  = getData[i]['imgU'] || getData[i]['image'] ?  getData[i]['imgU'] || getData[i]['image']   : noImg;

                                    aVarIMG.style.cssText = "background-size:cover;display: block;width:50px;height: 70px;background-image: url(" + sImg + ")";
                                    aVarTitle.innerHTML   = getData[i]['title'];
                                    pVarTime.innerHTML    = 'Duration: ' + getData[i]['runtime'];
                                    pVarYear.innerHTML    = 'Year: ' + getData[i]['year'];

                                    aVarIMG.setAttribute(  'href', "getMovie?id=" + getData[i]['idM']);
                                    aVarTitle.setAttribute('href', "getMovie?id=" + getData[i]['idM']);

                                    dVar.appendChild(aVarTitle);
                                    dVar.appendChild(pVarTime);
                                    dVar.appendChild(pVarYear);

                                    liVAr.appendChild(aVarIMG);
                                    liVAr.appendChild(dVar);

                                    ulAdd.appendChild(liVAr);
                                }
                        }

                    var liButon = document.createElement('li');
                    var aButon = document.createElement('a');

                    liButon.style.cssText = "padding: 0; border-bottom: none;border-radius : 0 0 5px 5px;";
                    liButon.setAttribute('class', "ss-bottom");

                    aButon.innerHTML = "View all";
                    aButon.id = "finde_all";
                    aButon.href = urlForSearch;

                    liButon.appendChild(aButon);

                    ulAdd.appendChild(liButon);
                }
        // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

        //----Nav Bar/Bar Requests Section , Filter section----
        // ----------------------------


            var headHover = document.querySelectorAll('.head');
            var checkData = false;

            headHover.forEach(function (el)
                {
                    el.addEventListener('mouseenter', function (e)
                        {
                            var value = 'true';

                            var data = e.currentTarget.firstChild.innerText.toLowerCase();

                            if (data === 'genres' && !checkData)
                                {
                                    var getVarName = 'genres=';
                                    var genresArr  = [];

                                    var rootElem = document.querySelector('.subM2 ul');

                                    var gerMov = BarPromise(method, url, async, getVarName, value);

                                    gerMov.then(function (data)
                                            {
                                                data.forEach(function (e)
                                                    {
                                                        genresArr.push(e['genre']);
                                                        checkData = true;
                                                    });
                                            })
                                        .then(function ()
                                            {
                                                barDeleteElem(rootElem);
                                                barCreateElem(genresArr, rootElem);
                                            })
                                        .catch(function (error)
                                            {
                                                alert(error);
                                            });




                                }

                        });

                    el.addEventListener('click', function (e)
                        {
                            // checkData   = false;
                            var text    = e.currentTarget.firstChild.innerText.toLowerCase().trim();
                            var favor   = e.currentTarget.firstChild.title.toLowerCase().trim()


                            var subUl_Check;
                            e.currentTarget.childNodes.forEach(function (e)
                                {
                                    if (e.tagName === 'UL')
                                        {
                                            subUl_Check = e;
                                        }
                                });


                            if (text === 'genres' && subUl_Check.compareDocumentPosition(e.target) === 20)
                                {

                                    var value = e.target.innerText;
                                    var file = searchFile;
                                    var getVariable = 'genres=';
                                    window.location = file + '?' + getVariable + value;

                                }

                        });
                });
            //...........................

            var filter_btn = document.querySelector('.filterButton ');

            var ulBtn = {
                            fOrder  : 'Default',
                            fQuality: 'All',
                            fGenre  : 'All',
                            fCountry: 'All',
                            fYears  : 'All'
                        };
            if(filter_btn)
                {
                    filter_btn.onclick = function (ev)
                        {
                            // var filterDiv  = document.querySelector('.filter');

                            var filtDopler = document.querySelector('.dopl_filter_wrapper');

                            var buttons    = document.querySelectorAll('.dopl_filter_wrapper > div > button');

                            if (filtDopler)
                                {
                                    filter_btn.style.backgroundColor = 'rgb(247, 239, 239)';
                                    filter_btn.style.color           = 'black';

                                    buttons.forEach(function (e) //save button text
                                        {
                                            var index    = e.parentNode.className;
                                            ulBtn[index] = e.innerText;
                                        });

                                    showHide(filtDopler.innerHTML + filter_btn.innerHTML, ev, filtDopler)

                                }
                            else if ( !filtDopler)
                                {
                                    filter_btn.style.backgroundColor = 'rgb(242, 76, 76)';
                                    filter_btn.style.color           = 'rgb(241, 247, 241)';

                                    filter();
                                }
                        };
                }

            //...........................


            function barCreateElem(countryArr, rootElem)
                {
                    var rootElem = rootElem;
                    var data     = countryArr;

                    data.forEach(function (e)
                        {
                            if (e && e != '')
                                {
                                    var li          = document.createElement('li');
                                        // li.className= "col-xs-2 ";
                                    var a           = document.createElement('a');
                                        a.innerHTML = e;

                                    li.appendChild(a);
                                    rootElem.appendChild(li);
                                }
                        });
                };
            function barDeleteElem(rootElem)
                {

                    while (rootElem.childNodes.length > 0)
                        {
                            rootElem.removeChild(rootElem.firstChild);
                        }
                }


            function BarPromise(meth, ul, asyn)
                {
                    var methodName  = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
                    var searchValue = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;

                    var csrf_token  = document.querySelector("meta[name='csrf-token']");
                        csrf_token  = csrf_token ? csrf_token.getAttribute('content') : csrf_token;

                    return new Promise(function (resolve, reject)
                        {
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

                            xhr.onerror = function ()
                                {
                                    reject(xhr.statusText);
                                };
                            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                            // xhr.setRequestHeader('X-CSRF-TOKEN', csrf_token );
                            xhr.send(methodName + searchValue);
                        });
                }
            function filterCountry(data)
                {

                    var uniqueCountry = [];
                    var newData       = [];

                    data.forEach(function (e)
                        {
                            var localArr = e['country'].split(',');

                            localArr.forEach(function (e)
                                {
                                    if (e != '') newData.push(e.trim());
                                });
                        });

                    newData.filter(function (e)
                        {
                            if (uniqueCountry.indexOf(e) === -1)
                                {
                                    uniqueCountry.push(e);
                                }
                        });
                    return uniqueCountry.sort();
                }

            //Filter
            function filter() // fill in Content for Filter
                {

                    var getVarName = 'filter=';
                    var value = 'true';

                    var allData = [];

                    var gerMov = BarPromise(method, url, async, getVarName, value);

                    gerMov.then(function (data)
                        {
                            allData['q'] = [];
                            allData['genre'] = [];
                            allData['year'] = [];

                            data['q'].forEach(function (e)
                                {
                                    if (e['quality'] != '')
                                        {
                                            allData['q'].push(e['quality']);
                                        }
                                });
                            allData['q'].sort();

                            data['genre'].forEach(function (e)
                                {
                                    if (e['genre'] != '')
                                        {
                                            allData['genre'].push(e['genre']);
                                        }
                                });

                            data['year'].forEach(function (e)
                                {
                                    if (e['year'] != '')
                                        {
                                            allData['year'].push(e['year']);
                                        }
                                });
                            allData['year'].sort().reverse();

                            allData['country'] = filterCountry(data['country']);
                        })
                    .then(function ()
                        {
                            var reqYear    = '.filter [name=fYears]';
                            var reqGenre   = '.filter [name=fGenre]';
                            var reqCountry = '.filter [name=fCountry]';

                            adSelectEl(reqYear, allData['year']);
                            adSelectEl(reqGenre, allData['genre']);
                            adSelectEl(reqCountry, allData['country']);

                            var check = window.location.search;
                            if (check.indexOf('fOrder') != -1 || check.indexOf('genres') != -1)
                                saveSelected();
                        })
                    .then(function ()
                        {
                            var filter_btn = document.querySelector('.filterButton ');
                            var filterDiv  = document.querySelector('.filter');
                            var filtDopler = document.querySelector('.dopl_filter_wrapper');

                            createEl_dopler(filter_btn.parentNode, filterDiv.childNodes[1]);
                            form_liColor();
                        })
                    .catch(function (error)
                        {
                            alert(error);
                        });
                }
            function adSelectEl(query, data)
                {

                    var query    = query; //'.filter [name=years]';

                    var elParent = document.querySelector(query);

                    var delEl    = document.querySelectorAll(query + '>*');
                    delEl.forEach(function (e)
                        {
                            if (e.innerText != 'All') e.remove();
                        });

                    data.forEach(function (e)
                        {
                            elParent.insertAdjacentHTML('beforeend', "<option value=" + e + ">" + e + "</option>");
                        });

                    // -------------Options--------------
                    // 'beforebegin': Before the element itself.
                    // 'afterbegin' : Just inside the element, before its first child.
                    // 'beforeend'  : Just inside the element, after its last child.
                    // 'afterend'   : After the element itself.
                }
            function saveSelected()
                {
                    var data = [];

                    var filter_send = document.querySelector('.filter > form button');

                    var allArr = window.location.search;

                    var fOrder   = /fOrder.*?(?=&)/;
                    var fQuality = /fQuality.*?(?=&)/;
                    var fGenre   = /fGenre.*?(?=&)/;
                    var fCountry = /fCountry.*?(?=&)/;
                    var fYears   = /fYears.*?(?=&)|fYears.*/;
                    var genres   = /genres.*/;

                    fOrder   = fOrder.exec(allArr)   ?  fOrder.exec(allArr)[0].split('=')[1]   : fOrder;
                    fQuality = fQuality.exec(allArr) ?  fQuality.exec(allArr)[0].split('=')[1] : fQuality;
                    fGenre   = fGenre.exec(allArr)   ?  fGenre.exec(allArr)[0].split('=')[1]   : fGenre;
                    fCountry = fCountry.exec(allArr) ? fCountry.exec(allArr)[0].split('=')[1] : fCountry;
                    fYears   = fYears.exec(allArr)   ?  fYears.exec(allArr)[0].split('=')[1]   : fYears;
                    genres   = genres.exec(allArr)   ? genres.exec(allArr)[0].split('=')[1]   : genres;

                    fOrder === 'default' ? fOrder   = fOrder   : setAtrrSelected(fOrder, 'fOrder');
                    fQuality === 'all'   ? fQuality = fQuality : setAtrrSelected(fQuality, 'fQuality');
                    fGenre === 'all'     ? fGenre   = fGenre   : setAtrrSelected(fGenre, 'fGenre');
                    fCountry === 'all'   ? fCountry = fCountry : setAtrrSelected(fCountry, 'fCountry');
                    fYears === 'all'     ? fYears   = fYears   : setAtrrSelected(fYears, 'fYears');
                    genres === /genres.*/ ? genres  = genres   : setAtrrSelected(genres, 'fGenre');

                    function setAtrrSelected(val, kay)
                        {
                            var val = decodeURIComponent(val);
                            var kay = kay;
                            var data = document.querySelectorAll('.filter [name=' + kay + '] option');

                            data.forEach(function (e)
                                {

                                    if (e.value === val)
                                        {
                                            e.setAttribute("selected", "selected");
                                        }
                                });
                        };
                }
            function createEl_dopler(el, filter)
                {

                    var div           = document.createElement('div');
                        div.className = 'dopl_filter_wrapper';

                    var showButton    = document.createElement('button');
                    var span          = document.createElement('span');
                        span.innerText= 'Show';
                    showButton.appendChild(span);

                    var text = filter.innerHTML.match(/\w+(?=:)/g).filter(function (e)
                        {
                            return e.trim();
                        });

                    for (var i = 0; i < filter.children.length - 1; i++)
                        {

                            var divSelect           = document.createElement('div');
                                divSelect.className = filter.children[i].name;

                            var button           = document.createElement('button');
                                button.innerText = ulBtn[filter.children[i].name];

                            var ul               = document.createElement('ul');
                                ul.style.cssText = 'display:none;';

                            filter.children[i].childNodes.forEach(function (e)
                                {
                                    if (e.localName === 'option')
                                        {
                                            var li               = document.createElement('li');
                                                li.style.cssText = 'cursor : pointer; list-style-type : none;';
                                                li.className     = 'li ' + e.parentNode.name;
                                                li.innerText     = e.innerText;

                                            ul.appendChild(li);
                                            li_listener(li, button, e);
                                        }
                                    if (e.localName === 'option' && e.outerHTML.indexOf('selected') != -1)
                                        {
                                            button.innerText = e.innerText;
                                        }
                                });

                            divSelect.appendChild(button);
                            button.insertAdjacentHTML('beforebegin', text[i] + ': ');
                            divSelect.appendChild(ul);
                            div.appendChild(divSelect);

                            hideShow(button, ul, 'dont');
                        }

                    function li_listener(li, btn, formElem)
                        {

                            li.onclick = function (e)
                                {
                                    btn.innerText = li.innerText;

                                    formElem.setAttribute("selected", "selected");
                                    window.scrollTo(0, 0);
                                };
                        }

                    div.insertAdjacentElement('beforeend', showButton);
                    el.insertAdjacentElement('afterend', div);
                    // sendForm();
                    // -------------Options--------------
                    // 'beforebegin': Before the element itself.
                    // 'afterbegin' : Just inside the element, before its first child.
                    // 'beforeend'  : Just inside the element, after its last child.
                    // 'afterend'   : After the element itself.
                }
            function form_liColor()
                {
                    var buttons = document.querySelectorAll('.dopl_filter_wrapper > div > button');

                    var elTemp = undefined;

                    buttons.forEach(function (btn)
                        {

                            btn.onclick = function (e)
                                {

                                    if (elTemp)
                                        {
                                            elTemp.style.cssText = 'background-color : rgb(70, 66, 66); cursor : pointer; list-style-type : none;';
                                        }

                                    btn.nextSibling.childNodes.forEach(function (el)
                                        {

                                            if (btn.innerText === el.innerText)
                                                {
                                                    el.removeEventListener('mouseover', mOver);
                                                    el.removeEventListener('mouseleave', mLeave);

                                                    el.style.cssText = 'background-color : rgb(50, 177, 123); color : rgb(255,255,255); cursor : pointer; list-style-type : none;';
                                                    elTemp = el;
                                                }
                                            else
                                                {
                                                    el.addEventListener('mouseover', mOver);
                                                    el.addEventListener('mouseleave', mLeave);
                                                }
                                        });
                                };
                        });

                    function mOver(e)
                        {
                            e.target.style.cssText = 'background-color : rgb(50, 177, 123); color : rgb(255,255,255); cursor : pointer; list-style-type : none;';
                        }
                    function mLeave(e)
                        {
                            e.target.style.cssText = 'background-color : rgb(70, 66, 66); cursor : pointer; list-style-type : none;';
                        }
                }
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

        //----------------E-mail----------------
        // -------------------------------------
            var wrapperEmail = document.querySelector('.emessageWrap ');
            var closeEm      = document.querySelector('.emessageWrap .foterCl');
            var btnEm        = document.querySelector('footer .contact span');

            var inputEm = document.querySelector('.emessageWrap .sender');
            var btnSend = document.querySelector('.emessageWrap .btn');

            var erMessage = document.querySelector('.emessageWrap form > .dummy');

            if (wrapperEmail && closeEm && btnEm && inputEm && erMessage && btnSend)
            {

                hideShow(btnEm, wrapperEmail, closeEm, true);

                // btnSend.addEventListener('click', function (ev)
                // {
                //     ev.preventDefault();

                //     var emailErr  = document.querySelector('.emessageWrap .mailErr small');
                //     var messageEm = document.querySelector('.emessageWrap textarea');
                //     var messErr   = document.querySelector('.emessageWrap .textErr small');

                //     erMessage.className = 'dummy';
                //     erMessage.innerText = '';

                //     if (!inputEm.checkValidity())
                //         {
                //             emailErr.innerText = inputEm.validationMessage;
                //         }
                //     else if (inputEm.value === '')
                //         {
                //             emailErr.innerText = 'Email fild cannot be empty!';
                //         }
                //     else if (messageEm.value === '')
                //         {
                //             emailErr.innerText = '';
                //             messErr.innerText = 'Massege fild cannot be empty!';
                //         }
                //     else
                //         {
                //             emailErr.innerText = '';
                //             messErr.innerText = '';

                //             var methodName = 'sendMail=';

                //             var val      = JSON.stringify( { 'mail': inputEm.value, 'text': messageEm.value, 'g-recaptcha-response': grecaptcha.getResponse() } );
                //             var emAnsver = requestPromise(method, url, async, methodName, val, erMessage);

                //             emAnsver.then(function (data)
                //                         {
                //                             mailHandleResponce(data);
                //                         })
                //                     .catch(function (error)
                //                         {
                //                             alert(error);
                //                         });
                //         }
                // });
            };

            // function mailHandleResponce(data)
            //     {

            //         if (data['sucsess'])
            //             {
            //                 erMessage.className += ' sucsess';
            //                 erMessage.innerText = data['sucsess'];
            //                 erMessage.style.color = 'green';
            //             }
            //         else if (data['error'])
            //             {
            //                 erMessage.className += ' error';
            //                 erMessage.innerText = data['error'];
            //                 erMessage.style.color = 'red';
            //             };
            //     };
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

        //----Loggin Button Section/Show-Hide Element----
        // ----------------------------

            let loginContainet = document.querySelector('.loginContainer');

            if ( loginContainet )
                {
                    loginContainet.onclick = ()=>
                        {
                            if (document.querySelector('.enter'))
                                {
                                    var elem      = document.querySelector('.loginForm');
                                    var loginBtn  = document.querySelector('.enter');
                                    var closeElem = document.querySelector('.closeMe');

                                    if (loginBtn && elem)
                                        hideShow(loginBtn, elem, closeElem);

                                    //--Button color---
                                    document.querySelector('.enter').addEventListener('mousedown', function ()
                                        {
                                            document.querySelector('.enter').style.cssText = 'background-color: rgb(88, 181, 93);';
                                        });
                                    document.querySelector('.enter').addEventListener('mouseup', function ()
                                        {
                                            document.querySelector('.enter').style.cssText = 'background-color: rgb(122, 198, 127);';
                                        });

                                    //Login error Display
                                    var formLgIn = document.querySelector( 'form.loginForm');
                                    var erLabel  = document.querySelectorAll( 'form.loginForm .error' );

                                    if ( formLgIn )
                                        formLgIn.style =  erLabel[0] ? 'display: block;' : 'display: none;';



                                };

                            // ---LOGGED----
                            if (document.querySelector('.avatarlogged'))
                                {
                                    document.querySelector('.avatarlogged').style.cursor = 'pointer';

                                    var btn  = document.querySelector('.avatarlogged');
                                    var elem = document.querySelector('.fold');
                                    var form = document.querySelector('.logged');


                                    if ( btn && elem && form )
                                        {
                                            form.style = 'display: block;';

                                            hideShow( btn, form );
                                        }

                                };
                        }

                }




        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

        /*---------------Admin Features in Index------------------*/
            var delCinema = document.querySelectorAll('.movie_index .delMe');

            if (delCinema[0])
                {

                    delCinema.forEach(function (el)
                    {

                        el.addEventListener('click', function (ev)
                        {
                            var hrefCinema = el.parentNode.childNodes[7].childNodes[0].href;
                            var idfCinema = /id=(\d+)/.exec(hrefCinema)[1];

                            var methodTitle = "delMov=";

                            var delMov = requestPromise(method, url, async, methodTitle, idfCinema);

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
                };

        // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

        //----LOGO
            logo ();



});

//----[ Unuversal Functions ] ----//
    function showHide(area_innerHTML, event, element)
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
    function hideShow(btn, element)
        {

            var closeElement = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
            var inhtml       = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;


            var htmlv;
            var close_html;

            document.addEventListener('click', display);

            function display(e)
            {

                htmlv      = !inhtml                          ? element.outerHTML : element.innerHTML;
                close_html = typeof closeElement === 'string' ? closeElement      : '';


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

    function requestPromise(meth, ul, asyn)
        {
            var methodName  = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
            var searchValue = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
            var loading     = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;

            var csrf_token  = document.querySelector("meta[name='csrf-token']");
                csrf_token  = csrf_token ? csrf_token.getAttribute('content') : csrf_token;

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
                                // erMessage.style.color = 'green';
                            };
                    };

                xhr.onerror = function ()
                    {
                        reject(xhr.statusText);
                    };
                xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                // xhr.setRequestHeader('X-CSRF-TOKEN', csrf_token );
                xhr.send(methodName + searchValue);
            });
        }







