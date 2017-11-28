

App.controller('startController', ['$scope', '$http', '$interval', function ($scope, $http, $interval) {
    
    var socket = io.connect();

    var chatapp = new Chat(socket);

    $scope.messages = [];
    $scope.roomList = [];
    $scope.sendMessage = "";
    $scope.currentRoom = "Name Room";
    $scope.you = ""
    $scope.instructions = ["Change nickname: /nick [username]", "Join/create room: /join [room name]"];

    $scope.changeRoom = function (nameRoom) {
        console.info(nameRoom);
        chatapp.processCommand('/join ' + nameRoom);
    }

    $scope.processUserInput = function (msg, room) {

        var message = msg;

        var systemMessage;

        if (message.charAt(0) == '/') {

            systemMessage = chatapp.processCommand(message);

            if (systemMessage) {
                $scope.messages.push(systemMessage);
            }

        } else {

            chatapp.sendMessage(room, message);
            $scope.messages.push($scope.you + ": " + message);
            //$('#messages').scrollTop($('#messages').prop('scrollHeight'));

        }

        $scope.sendMessage = "";

    }

    socket.on('nameResult', function (result) {
        $scope.$apply(function () {
            var msg = "";

            if (result.success) {
                msg = 'you are now known as ' + result.name + '.';
                $scope.you = result.name;
            } else {
                msg = result.message;
            }

            $scope.messages.push(msg);
        });
    });

    socket.on('joinResult', function (result) {
        $scope.$apply(function () {
            $scope.currentRoom = result.room;
            $scope.messages.push('room changed.');
        });
    });

    socket.on('message', function (message) {
        $scope.$apply(function () {
            $scope.messages.push(message.text);
        });
    });

    socket.on('rooms', function(rooms) {
        $scope.$apply(function () {
            $scope.roomList = [];
    	    for(var room in rooms) {
    		    room = room.substring(1, room.length);
    		    if (room != '') {
    		        $scope.roomList.push(room);
    		    }
    	    }
        });
    });

    $interval(function () {
    	socket.emit('rooms');
    }, 1000);
	
}]);
