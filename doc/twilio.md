# Twilio

В приведенном примере реализованы следующий возможности:
* чат 1х1;
* груповые чаты;
* отправка текстового сообщения;
* приглашени в чат 1х1 участника групового чата;
* отображения колличества непрочитанных сообщений в каждом из каналов;

Для начала работы с сервислм необходимо зарегестрироваться и получить необходимые токины.
- [Creating Access Tokens](https://www.twilio.com/docs/chat/create-tokens)

У токенов есть буквенные префиксы, на это соит обратить внимание, т.к. это помагает не запутатся в их многообразии.

## MiddleEnd
Необходимо реализовать свой MiddleEnd, его роль заключается в том чтобы получать сессионные токены и обновлять его когда закончится его жизненнный цикл. По жизенному циклу токенов есть соответствующий [раздел в документации](https://www.twilio.com/docs/chat/access-token-lifecycle). <br/>
В нашем случае мы создали Node сервер на [Koa](https://koajs.com/) у которого есть один endpoint по которому мы получаем сессионный токен для пользователя. В нашем примере нет проверки того кто получает этот токен, в реальной жизни это необходимо реализовывать.

## FrontEnd
Архитектурно было решено использовать минимальное количество зависимостей т.к. задача у нас - быстро интегрировать чат в любой проект на ReactJS.
Исходя из этого строим интеграцию на обновленном [Context API](https://ru.reactjs.org/docs/context.html) для ReactJS.<br/>
Нам никто не мешает внедрить Redux или другой state manager на усмотрение интегратора, но для данной конкретной задачи это оверхед.

### Быстрый старт
Обернем в провайдер компонет в котором будит находится чат.

 ```jsx
  <ChatProvider>
    <App />
  </ChatProvider>
 ```
Совсем не обязательно оборачивать все приложение, достаточно лиш компонент верхнего уровня в котором мы будим использовать чат.

Компонеты в которых мы хотим пользоватся API необходимо обернуть в декоратор
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
В примере реализованны базовые методы минимально необходимые для работы интеграции:
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
Вызываем для того чтоб авторизоватся и установить соединение.
```typescript
connect(getToken: () => Promise<string>, user: string) => Promise<void>;
```
В качестве аргументов передается:
* функция возращающая промис с токеном
* идентификатор пользователя (уникальное имя)
Возвращает промис

#### createGroupChannel
Используем для создания группового канала
```typescript
createGroupChannel(name: string, description: string) => Promise<void>;
```
В качестве аргументов передается:
* уникальное имя канала
* описание канала
Возвращает промис

#### createPrivatChannel
Используем для создания канала 1х1
```typescript
createGroupChannel(peer: string, description: string) => Promise<void>;
```
В качестве аргументов передается:
* уникальное имя второго участника чата (уникальное имя канала формируется из имен участников отсортированных и разделенным '#' - просто соглашение)
* описание канала
Возвращает промис

#### joinChannel
Подключится к существующему каналу
```typescript
joinChannel(name: string) => Promise<void>;
```
В качестве аргументов передается:
* имя существующего канала
Возвращает промис

#### getMessage
Загружаем сообщения из канала
```typescript
getMessage(name: string, pageSize?: number, anchor?: number) => Promise<void>;
```
В качестве аргументов передается:
* имя существующего канала;
* количество сообщений в запрашиваемой странице;
* номер запрашиваемой страницы;
Возвращает промис

#### sendMessage
Отправляем сообщение в канал
```typescript
sendMessage(name: string, message: string | FormData) => Promise<void>;
```
В качестве аргументов передается:
* имя существующего канала;
* текстовое сообщение или FormData для отправки файлов;
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
Массив сообщеений
