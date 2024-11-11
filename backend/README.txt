//Run these commands from a separate terminal window. 
//To backup your MovieDB database
mongodump --db MovieDB --out ./backup
//To restore this database, 
mongorestore --db MovieDB ./backup/MovieDB

//When zipping your project, you have to backup the database manually, then extract it to a folder. 
