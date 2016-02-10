var Bot = require("slackbots");

var settings =
    {
        token: 'xoxb-20663502962-sOCyXxbdF61sT5IOtR3SkLIW',
        name: 'Deadpool',
        as_user:true
    };

var bot = new Bot(settings);
var botSettings = {icon_url: 'http://www.renegado.com.mx/images/Comics/Deadpool/deadpool.jpeg'};


process.stdin.resume();
process.stdin.setEncoding('utf8');
var util = require('util');

var catchInputOnce = function(validationCode)
{
    process.stdin.once('data', function (text)
    {
        if(!detectExitCodes(text))
        {
             validationCode(text);
        }
    });
}

var catchInputOnceWithMessage = function(validationCode,message)
{
    process.stdin.once('data', function (text)
    {
        if(!detectExitCodes(text))
        {
             validationCode(text,message);
        }
    });
}


console.log('Where do you want to send messages? (channel,group,private)')
var selectMessagingType = function(input)
{
    //console.log('received data:', util.inspect(input));
    if(input === 'channel\n')
    {
        console.log("To what Channel?")
        catchInputOnce(setChannelToChat)
    }else if(input === 'group\n')
    {
         console.log("To what Group?")
         catchInputOnce(setGroupToChat)
    }else if(input === 'private\n')
    {
        console.log("To who?")
        catchInputOnce(setUserToChat)
    }else
    {
        console.log('Please, select one of the following: channel,group or private')
        catchInputOnce(selectMessagingType);
    }
};

//---------------------------------------------------------------------------------------
var setChannelToChat = function(channelName)
{
    console.log('you are now chatting on channel: '+channelName+' Have fun! :)')
    catchInputOnce(sendMessageToChannel)
}

var setGroupToChat = function(groupName)
{
    console.log('you are now chatting on group: '+groupName+' Have fun! :)')
    process.exit()
}

var setUserToChat = function(userName)
{
    console.log('you are now chatting with: '+userName+' Have fun! :)')
    process.exit()
}
//---------------------------------------------------------------------------------------

var sendMessageToGroup = function(groupName,message)
    {
       // bot.postMessageToChannel('general','Siguen igual de aguados, mejor me voy con unas del tapanko',params)
    };

var sendMessageToChannel = function(channelName,message)
    {
       // bot.postMessageToChannel('general','Siguen igual de aguados, mejor me voy con unas del tapanko',params)
    };

var sendMessageToUser = function(userName,message)
    {
       // bot.postMessageToChannel('general','Siguen igual de aguados, mejor me voy con unas del tapanko',params)
    };



var detectExitCodes = function(text)
{
    if(text === "quit\n")
    {
        console.log('Bye :)')
        process.exit();
        return true;
    }else if(text === "/reset\n")
    {
        console.log('Reseting...')
        console.log('Where do you want to send messages? (channel,group,private)')
        catchInputOnce(selectMessagingType);
        return true;
    }else{return false;}
};

//-------------------- implementation

catchInputOnce(selectMessagingType);





/*
bot.on('start',sendMessageToMe);*/