# Twilio

В приведенном примере реализованы следующий возможности:
* чат 1х1;
* групповые чаты;
* отправка текстового сообщения;
* приглашение в чат 1х1 участника группового чата;
* отображения количества непрочитанных сообщений в каждом из каналов;

Для начала работы с сервисом необходимо зарегестрироваться и получить необходимые токены.
- [Creating Access Tokens](https://www.twilio.com/docs/chat/create-tokens)

У токенов есть буквенные префиксы, на это стоит обратить внимание, т.к. это помогает не запутаться в их многообразии.

## MiddleEnd
Необходимо реализовать свой MiddleEnd, его роль заключается в том чтобы получать сессионные токены и обновлять его когда закончится его жизненный цикл. По жизненному циклу токенов есть соответствующий [раздел в документации](https://www.twilio.com/docs/chat/access-token-lifecycle). <br/>
В нашем случае мы создали Node сервер на [Koa](https://koajs.com/) у которого есть один endpoint по которому мы получаем сессионный токен для пользователя. В нашем примере нет проверки того кто получает этот токен, в реальной жизни это необходимо реализовывать.

## FrontEnd
Архитектурно было решено использовать минимальное количество зависимостей т.к. задача у нас - быстро интегрировать чат в любой проект на ReactJS.
Исходя из этого строим интеграцию на обновленном [Context API](https://ru.reactjs.org/docs/context.html) для ReactJS.<br/>
Нам никто не мешает внедрить Redux или другой state manager на усмотрение интегратора, но для данной конкретной задачи это оверхед.

### Быстрый старт
Обернем в провайдер компонент в котором будит находится чат.

 ```jsx
  <ChatProvider>
    <App />
  </ChatProvider>
 ```
Совсем не обязательно оборачивать все приложение, достаточно лишь компонент верхнего уровня в котором мы будим использовать чат.

Компоненты в которых мы хотим пользоваться API необходимо обернуть в декоратор
```jsx
function Component(props) {
  return (
    <div>
      ...
    </div>
  )
}
export chatConnect(Component);
```
Можно также использовать хук [useContext](https://ru.reactjs.org/docs/hooks-reference.html#usecontext).

### API
В примере реализованы базовые методы минимально необходимые для работы интеграции::
#### Методы
* [connect](#connect)
* [createGroupChannel](#createGroupChannel)
* [createPrivatChannel](#createPrivatChannel)
* [joinChannel](#joinChannel)
* [getMessage](#getMessage)
* [sendMessage](№sendMessage)
#### 
* [currentChanel](#currentChanel)
* [channels](#channels)
* [privatChannels](#privatChannels)
* [groupChannels](#groupChannels)
* [messages](#messages)

#### connect
Вызываем для того чтоб авторизоваться и установить соединение.
```typescript
connect(getToken: () => Promise<string>, user: string) => Promise<void>;
```
В качестве аргументов передается:
* функция возвращающая промис с токеном
* идентификатор пользователя (уникальное имя)<br/>
Возвращает промис

#### createGroupChannel
Используем для создания группового канала
```typescript
createGroupChannel(name: string, description: string) => Promise<void>;
```
В качестве аргументов передается:
* уникальное имя канала
* описание канала<br/>
Возвращает промис

#### createPrivatChannel
Используем для создания канала 1х1
```typescript
createGroupChannel(peer: string, description: string) => Promise<void>;
```
В качестве аргументов передается:
* уникальное имя второго участника чата (уникальное имя канала формируется из имен участников отсортированных и разделенным '#' - просто соглашение);
* описание канала<br/>
Возвращает промис

#### joinChannel
Подключится к существующему каналу
```typescript
joinChannel(name: string) => Promise<void>;
```
В качестве аргументов передается:
* имя существующего канала<br/>
Возвращает промис

#### getMessage
Загружаем сообщения из канала
```typescript
getMessage(name: string, pageSize?: number, anchor?: number) => Promise<void>;
```
В качестве аргументов передается:
* имя существующего канала;
* количество сообщений в запрашиваемой странице;
* номер запрашиваемой страницы;<br/>
Возвращает промис

#### sendMessage
Отправляем сообщение в канал
```typescript
sendMessage(name: string, message: string | FormData) => Promise<void>;
```
В качестве аргументов передается:
* имя существующего канала;
* текстовое сообщение или FormData для отправки файлов;<br/>
Возвращает промис

#### currentChanel
Активный канал

#### channels
Коллекция каналов

#### privatChannels
Массив каналов 1х1

#### groupChannels
Массив груповых каналов

#### messages
Массив сообщений
