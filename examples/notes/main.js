'use strict';

var notesApp = (function() {

    var tbody, form, textarea, addBtn, submitBtn, closeBtn;

    function documentReady() {
        tbody = document.querySelector('tbody');
        addBtn = document.querySelector('#add-note');
        form = document.querySelector('form');
        textarea = document.querySelector('textarea');
        submitBtn = document.querySelector('button[type="submit"]');

        bind();

        if (!getData('notes')) {
            var notesArr = [];
            localStorage.setItem('notes', JSON.stringify(notesArr));
        } else {
            loadNotes();
        }
    }

    function bind() {
        addBtn.addEventListener('click', openForm);
        textarea.addEventListener('keyup', checkBtnState);
        form.addEventListener('submit', saveNote);
        tbody.addEventListener('click', removeNote);
    }

    function unbind() {
        addBtn.removeEventListener('click', openForm);
        textarea.removeEventListener('keyup', checkBtnState);
        form.removeEventListener('submit', saveNote);
        tbody.removeEventListener('click', removeNote);
    }

    // формирует таблицу данных из локального хранилища
    function loadNotes() {
        var notes = getData('notes');
        notes.forEach(function(item, i, notes) {
            renderNote(item);
        });
    }

    // возвращает массив объектов по ключу из локального хранилища 
    function getData (item) {
    	return JSON.parse(localStorage.getItem(item));
    }

    // формирует строку таблицы с данными из локального хранилища
    function renderNote(note) {
        var tr = document.createElement('tr'),
            tdText = document.createElement('td'),
            tdDate = document.createElement('td'),
            tdDelete = document.createElement('td');

        tr.setAttribute('data-note-id', note.id);

        tdText.innerHTML = note.text;
        tdDate.innerHTML = formatDate(note.date);
        tdDelete.innerHTML = '<i class="close text-center">&times;</i>';

        tr.appendChild(tdText);
        tr.appendChild(tdDate);
        tr.appendChild(tdDelete);

        tbody.appendChild(tr);
    }

    // показывает форму ввода данных, скрывает кнопку "Добавить заметку"
    function openForm(e) {
        e.preventDefault();
        form.className = 'show';
        addBtn.className = 'hidden';
    }

    // скрывает форму ввода данных, показывает кнопку "Добавить заметку"
    function closeForm() {
        form.className = 'hidden';
        addBtn.className = 'show';
    }

    // устанавливает видимость кнопки "Добавить" в зависимости от значения текстового поля
    function checkBtnState() {
        if (textarea.value !== '') {
            submitBtn.removeAttribute('disabled')
        } else {
            submitBtn.setAttribute('disabled', 'disabled');
        }
    }

    // удаляет данные из локального хранилища и DOM
    function removeNote(e) {
        if (e.target.tagName !== 'I') return;

        var notes = getData('notes');
        var noteTr = e.target.parentElement.parentElement;
        notes.forEach(function(item, i, notes) {
            if (item.id === parseInt(noteTr.dataset.noteId)) {
                notes.splice(i, 1);
                localStorage.setItem('notes', JSON.stringify(notes));
                e.currentTarget.removeChild(noteTr);
            }
        });
    }

    // сохраняет данные в локальном хранилище (значение ключа = массив объектов)
    function saveNote() {

        event.preventDefault();

        var text = textarea.value,
            date = Date.now(),
            id = date;

        var notesArr = getData('notes');

        notesArr.push({
            id: id,
            date: date,
            text: text
        });
        var currentIndex = notesArr.length - 1;

        localStorage.setItem('notes', JSON.stringify(notesArr));

        var obj = getData('notes')[currentIndex];

        textarea.value = '';

        checkBtnState();
        renderNote(obj);
        closeForm();
    }

    // возвращает дату в формате YYYY/MM/DD HH:MM
    function formatDate(ms) {
        var date = new Date(ms);

        var yy = date.getFullYear();

        var mm = date.getMonth() + 1;
        if (mm < 10) mm = '0' + mm;

        var dd = date.getDate();
        if (dd < 10) dd = '0' + dd;

        var hh = date.getHours();
        if (hh < 10) hh = '0' + hh;

        var mn = date.getMinutes();
        if (mn < 10) mn = '0' + mn;

        return yy + '/' + mm + '/' + dd + ' ' + hh + ':' + mn;
    }

    function disable () {
    	unbind();
    	localStorage.clear();
    }


    return {
        init: documentReady,
        disable: disable
    }

}());



document.addEventListener('DOMContentLoaded', notesApp.init);
