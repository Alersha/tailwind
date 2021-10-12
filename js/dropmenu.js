let drop = document.querySelectorAll('[data-dropdown-toggle]'); //определяемся с элементом
console.log(drop); //проверяем
drop.forEach(function (e) {
    var dropdownMenuId = e.getAttribute('data-dropdown-toggle'); // определяем название id элемента по эвенту
    var dropdownMenuEl = document.getElementById(dropdownMenuId); // находим элемент с этим id, название поймали выше
    // dropdownMenuEl теперь содержит второй элемент для попера, он в хтмл как див но пока хайден
    e.addEventListener('click', function (event) { // вешаем клик и описываем что должны сделать
        var element = event.target; // присваиваем таргет в переменную, первый элемент для попера - buttom
        // console.log(element); // проверим что пришло, должна быть кнопка buttom
        /* while (element.nodeName !== "BUTTON") {
            element = element.parentNode; 
        } // на всякий проверяем */
        Popper.createPopper(element, dropdownMenuEl, { // через попер выстраиваем дизайн элемента и попера
            placement: 'bottom-start',
            modifiers: [
                {
                    name: 'offset',
                    options: {
                        offset: [33, 33],
                    },
                },
            ]
        });

        // toggle when click on the button
        dropdownMenuEl.classList.toggle("hidden");  // раскрываем второй элемент
        dropdownMenuEl.classList.toggle("block"); // добовляем к нему css блок

        function handleDropdownOutsideClick(event) { // по большому счету не обязательно,
            // пишем функцию на закрытие меню, по клику в любом месте dom.
            var targetElement = event.target; // clicked element
            if (targetElement !== dropdownMenuEl && targetElement !== e && !e.contains(targetElement)) {
                // проверяем чтобы таргет не совпадал с ранее найденом id кнопки и наше событие по кнопкиж
                dropdownMenuEl.classList.add("hidden");
                dropdownMenuEl.classList.remove("block");
                document.body.removeEventListener('click', handleDropdownOutsideClick, true);
            }
        }

        // hide popper when clicking outside the element
        document.body.addEventListener('click', handleDropdownOutsideClick, true);
    });
});