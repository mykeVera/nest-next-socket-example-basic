# 1. Create aplication

```bash
$ nest new nestjs-socket-example
```

# 2. Install socket de nest y socket.io

```bash
$ npm i --save @nestjs/websockets @nestjs/platform-socket.io
$ npm i socket.io
```

# 3. Generate resource and select "WebSockets"

```bash
$ nest g resource chat
```