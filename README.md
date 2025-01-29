# Тестовое задание на позицию middle frontend-разработчик

Проект представляет из себя canvas элемент во всю ширину экрана построенного с помощью библиотек konva и react-konva.

Есть две кнопки:

1. Взаимодействие - можно двигать как фигуры, так и сам канвас. А также по клику на фигуру открывается/закрывается текстовое поле ввода
2. Добавление - по клику добавляется новая фигура

### Что необходимо сделать:

1. Добавить стили для компонентов. Обязательные условия использовать препроцессор sass/scss
2. Типизировать проект
3. Добавить текстовый редактор. При открытом поле ввода должна появляться меню, позволяющая изменить текст (сделать жирным, поменять размер шрифта, цвет и т.п.). После закрытия поля ввода, введеный текст должен отобразиться на канвасе как картинка в том же месте фигуры, сохранив при этом все стили.

### Также приветствуется, но необязательно:

1. Улучшить архитектуру приложения
2. Оптимизировать приложение
3. Добавить в меню фигуры кнопку, позволяющую изменить любое свойство фигуры (форму, цвет фона, цвет контура и т.п.)

### Что можно:

1. Изменять код как угодно, в том числе полностью собрать свой проект
2. Использовать любые библиотеки. Для редактора текста они понадобятся
3. Изменять интерфейс, способ добавления фигур, их начальные параметры и т.д.
4. Добавлять любой функционал по желанию

### Что должно быть обязательно:

1. Сохранение текущего функционала. Перемещение канваса, фигур и ввод текста должны быть обязательно
2. Использовать препроцессор sass/scss
3. Проект не должен содержать any
4. Проект должен билдиться

### Как запустить:

npm run dev - режим разработки
npm run build - сборка
