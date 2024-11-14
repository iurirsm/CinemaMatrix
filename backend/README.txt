//Run these commands from a separate terminal window. 
//To backup your MovieDB database
mongodump --db MovieDB --out ./backup
//To restore this database, 
mongorestore --db MovieDB ./backup/MovieDB

//When zipping your project, you have to backup the database manually, then extract it to a folder. 

To backup the users mongodump --db MovieDB --collection users --out ./backup

To dump the whole thing, like this 
mongorestore --uri "mongodb+srv://programerz:ItP5L4qacgu7d3Yg@cinemamatrix.501ec.mongodb.net/CinemaMatrix" ./backup/MovieDB

Make sure the user.bson is in the backupfolder