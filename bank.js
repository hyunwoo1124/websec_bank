// For keyboard input
const readline = require('readline-sync');

// -----------------------------------------------
// Clear the screen
// -----------------------------------------------
function clearScreeen()
{
	// Clear the screen
	console.log('\033[2J');
}


// ------------------------------------------------
// The constructor for the Account class
// @param acctName - the account name
// @param acctBalance - the amount
// @param type - the type of account
// ------------------------------------------------
function Account(acctName, acctBalance, type)
{
	// The account name
	this.acctName = acctName;
	
	// The account amount
	this.acctBalance = acctBalance;
		
	// The 1 percent interest rate - because our bank is the best!	
	this.interestRate = 1;

	// The account type
	this.type = type;
	
	// Returns the account name
	this.getAcctName = function() { return this.acctName; }
	
	// Returns the account balance
	this.getBalance = function() { return this.acctBalance; }
	
	// Returns the account type
	this.getAccountType = function() { return this.type; }
	
	// Deposits money to the account
	// @param amount - the amount to deposit
	// Austin now forces a number data type
	this.deposit = function(amount) { this.acctBalance  = parseFloat(this.acctBalance) + parseFloat(amount); }
	
	// Withdraws money from the account
	// @param amount - the amount to withdraw
	// Austin now forces a number data type
	// Austin also checks if the account has enough money
	this.withdraw = function(amount){ 
		if (parseFloat(this.acctBalance) < parseFloat(amount)){
			console.log("Account does not have enough money. Process voided.");
			// Show the user menu
			//this.userActionMenuUI();
			/*
			we should bring a userActionMenuUI
			*/
			this.userActionMenuUI
		}
		else{
			this.acctBalance = parseFloat(this.acctBalance) - parseFloat(amount); 
		}
	}
	
	// Prints the account information
	this.printAcct = function()
	{
		console.log("Account name: ", this.getAcctName());
		console.log("Account type: ", this.getAccountType());
		console.log("Account balance: ", this.getBalance(), "\n");
	}
}

// ------------------------------------------------
// The constructor for the customer class
// @param userName - the user name
// @param userPassword - the user password
// ------------------------------------------------
function Customer(userName, userPassword)
{
	// Save the user name and password
	this.userName = userName;
	this.userPassword = userPassword;
	
	// Returns the username
	this.getUserName = function() { return this.userName; }
	
	// Returns the password
	this.getPassword = function() { return this.userPassword; }
	
	// Returns the accounts
	this.getAccounts = function() { return this.accounts; }
	
	// Add account
	// @param account - the account
	this.addAccount = function(account) { this.accounts.push(account); }
	
	// Returns the account based on the account index
	// @param acctIndex - the account index
	// @return - the account based on the index	
	this.getAccount = function(acctIndex) { return this.accounts[acctIndex]; }
		
	// The list of accounts	
	this.accounts = []	
}

// ----------------------------------------------
// The constructor of the Bank class
// @param name - the name of the bank 
// @param initCustomerList - the initial customer list
// ----------------------------------------------
function Bank(name, initCustomerList)
{
	// Save the bank name
	this.name = name;

	// The object that acts like a map representing the bank customers.
	// The key is the customer user name. The value is the Customer object
	// containing the customer information
	this.customers = {};
	
	// found let changed to let

	// The welcome banner ad!
	for(let i = 0; i < 3; i++)
	{
		console.log("Welcome to ", name, "!\n");
	}
	
	// changed let to let

	// Initialize the customer map
	let i = 0;
	while( i < initCustomerList.length)
	{
		// Get the customer
		customer = initCustomerList[i];

		this.customers[customer.getUserName()] = customer;
		
		// Next user!	
		i += 1;	
	}
	
	// -------------------------------------------------------------
	// Creates a new user with the specified user name and password.
	// Returns a user object specifying the new user
	// @param userName - the name of the user
	// @param userPassword - the user password
	// The newly created user.
	// -------------------------------------------------------------
	this.createAndAddCustomer = function(userName, userPassword)
	{
		// Jason var to let 
		// Create a new customer
		let customer = new Customer(userName, userPassword);	
		
		// Save the customer
		this.customers[customer.getUserName()] = customer;
		
		
	}
	
	// ----------------------------------------------
	// Allows the user to enroll in the bank (the UI)
	// ----------------------------------------------
	this.createCustomerUI = function()
	{
		// Jason var to let 

		// Create user name
		let userName = readline.question("Please pick a user name: ");
		
		// Pick the password 
		let userPassword = readline.question("Please pick a user password: ");	
		
		// Create and add user
		this.createAndAddCustomer(userName, userPassword);
		
		// makes customer open account so they can do stuff with money- jason
		//this.openAccountUI(customer);
		
		console.log("Created account for ", userName);
		
		
	}

	// -----------------------------------------------
	// The user action selection menu
	// @param customer - the customer 
	// -----------------------------------------------
	this.userActionMenuUI = function(customer)
	{
		// removed var and replaced with let and moved up the nested loop to be 
		// readable for blocked code
		let choice;
		do
		{
			// Get the user input and create a customer object
			console.log("-----------------------------------------------");
			console.log("1. Deposit");
			console.log("2. Withdraw");
			console.log("3. Transfer");
			console.log("4. View Accounts");
			console.log("5. Open New Account");
			console.log("6. Remove Account");
			console.log("7. Logout");
			console.log("-----------------------------------------------\n\n");

			// Accept input
			choice = readline.question("Choice: ");
			
			// Decide what to do
			
			// Deposit	
			if(choice == 1)
			{
				console.log("Deposit");
				this.depositUI(customer);
			}
			// Withdraw
			else if(choice == 2)
			{
				console.log("Withdraw");
				this.withdrawUI(customer);
			}
			// Transfer
			else if(choice == 3)
			{
				console.log("Transfer");
				this.transferUI(customer);
			}
			// View accounts
			else if(choice == 4)
			{
				console.log("View Accounts");
				this.viewAccounts(customer);
				
			}
			// Open new account
			else if(choice == 5)
			{
				console.log("Open New Account");
				this.openAccountUI(customer);
			}
			// Close customer account
			else if(choice == 6)
			{
				console.log("Remove Account");
				this.closeAccount(customer)
			}
		}
		while(choice != 7);
	}
	
	
	// -------------------------------------------
	// Prints the accounts
	// @param customer - the customer for which
	// to print the customer
	// -------------------------------------------
	this.viewAccounts = function(customer) 
	{
		// Get the accounts
		let accounts = customer.getAccounts();
		
		// The account counter
		let accountNum = 1;
			
		// Print the accounts
		for(account of accounts)
		{
			

			console.log("Account ", accountNum);
			account.printAcct();
			
			// Next account
			accountNum += 1;
		}
	} 
		
	// ------------------------------------------------------------
	// Master choice menu
	// ------------------------------------------------------------
	this.masterChoice = function()
	{
		 
		// moved choice from underneath to here to allow
		// blocked code to recognize this variable let choice
		let choice;
		do
		{
			console.log("What would you like to do?");
			console.log("1. Login");
			console.log("2. Create Account\n");
			
			// Get the choice
			choice = readline.question("Choice: ");	
			

			// Login
			if(choice == 1)	
				this.loginUI();

			// Create new user account
			else if (choice == 2)
				this.createCustomerUI();
			
		}while(choice != 1 && choice != 2);
	}
	
	// -------------------------------------------------------------
	// The login menu
	// -------------------------------------------------------------
	this.loginUI = function()
	{
		// moved let variables up here to allow blocked code to recognize
		// varialbes: userName, userPassword, match
		let userName;
		let userPassword;
		let match;
		do
		{
			console.log("Please enter your user name and password");
		
			// Get the user name
			userName = readline.question("Username: ");
	
			// Get the password	
			userPassword = readline.question("Password: ");

			// Whether there was a match
			match = this.login(userName, userPassword);

		} while(!match);
		// Get the customer
		
		//this.masterChoice();
		let customer = this.getCustomer(userName);
		
		// Show the user menu
		this.userActionMenuUI(customer);
	}
	
			
	// -----------------------------------------------
	// Checks the provided user credentials
	// @param userName - the user name
	// @param userPassword - the user password
	// -----------------------------------------------
	this.login = function(userName, userPassword)
	{		
		// The match
		let match = false;
		
		// Is this a registered user?
		if(userName in this.customers)
		{
			// Get the customer
			let customer = this.customers[userName];
			
			// Check the password
			if(customer.getPassword() == userPassword) { match = true; }
		}
		// New code added to add exception - kevin
		else{
			console.log("You are not registered. Please create an account...\n")
			this.masterChoice();
		}
		return match;
	}
	
	// ----------------------------------------------------
	// Adds a new account (e.g., savings or checking for the 
	// existing user.
	// @param customer - the customer
	// @param acctName - the account name
	// @param initialDeposits - the initial deposit
	// @param type - the type of account: either "checking"
	// or "savings".
	// @return - the object of type Account rerepsenting
	// the newly created account
	// ---------------------------------------------------
	this.createAccount = function(customer, acctName, initialDeposits, type)
	{
		// Create a new account
		let account = new Account(acctName, initialDeposits, type);
		
		// Add account to the user
		customer.addAccount(account);
	}	
	
	
	// ----------------------------------------------------
	// Opens an new account for the existing customer (UI)
	// @param customer - the customer for whom to open
	// the account
	// ------------------------------------------------------
	this.openAccountUI = function(customer)
	{
		// The account name
		let accountName = readline.question("Please choose an account name: ");	
		
		// Get the account type
		
		let accountType = readline.question("Please choose (1) for savings and (2) for checking: ");
		
		// The account type
		let choosenType = null;
		
		// The account type: sacings or checking
		if(accountType == 1) { choosenType = "savings"; }
		else { choosenType = "checking"; }
		
		// The initial deposit
		let done = false;
		let intAmount = 0;
		while (!done)
		{
			let initialDeposit = readline.question("Please enter the deposit amount: ");
					
			// Convert to integer
			intAmount = +initialDeposit;
					
			done = validateAmount(intAmount);

			if(!done){
				console.log("That is not a valid number.");
			}	
		}	
		
		
		// The account name
		this.createAccount(customer, accountName, parseFloat(intAmount), choosenType);
	}

	// --------------------------------------------------
	// Returns the account at a particular index if it exists
	// @param user - the user
	// @param accountChoice - the account choice
	// @return - returns the account at the given index it
	// exists. Otherwise, returns null
	// --------------------------------------------------
	this.getAccount = function(user, accountChoice)
	{
		// Get the user accounts
		let accounts = user.userAccounts();

		// THe account
		let account = null;

		// Check the account index
		if(accounts.length > accountChoice && !isNaN(accountChoice))
		{
			accountChoice = accounts[accountChoice - 1];
		}

		return account;
	}
	

	// ----------------------------------------------------
	// Checks to make sure that the entered amount is valid
	// @param ammount - the amount
	// @return - true if the ammount is valid an false otherwise
	// ----------------------------------------------------
	validateAmount = function(amount)
	{
		// The return value
		let retVal = true;
		// A NaN value
		if(isNaN(amount)) { retVal = false; }

		// Infinite
		else if(!isFinite(amount)) { retVal = false; }

		// Null
		else if(amount === null) { retVal = false; }
	
		// Check for the negative amont
		else if(amount < 0) { retVal = false; }
		
		// Make sure it is a number
		else if(typeof(amount) !== 'number') { retVal = false; }
		return retVal;

	}

	// ------------------------------------------------------
	// The UI for depositing money
	// @param user - the owner of the account
	// ------------------------------------------------------
	this.depositUI = function(user)
	{
		// The deposit account
		//MIG: Stopped here
		
		// -kevin added this but creates an arror
		//let accountExist = this.viewAccounts(user)
		
		// Get the coounts
		let accounts = user.getAccounts();

		if(accounts.length > 0)
		{
			this.viewAccounts(user)
			/*
			if (accountExist === ''){
				console.log("You do not have an account with us yet.\n")
				console.log("Please create an account first...\n")
				console.log("Bringing your options...\n")
				this.userActionMenuUI()
			}
			*/

			// Get the account choice
			let accountIndex = readline.question("Please select an account by entering a choice (e.g., enter 1 for the first account) ");

			// Get the account based on index
			let account = user.getAccount(accountIndex - 1);	
			let intAmount = 0;
			
			if(account)
			{

				// Get the deposit amount
				// Austin now checks if deposit amount is NaN or negative
				let done = false;

				while (!done)
				{
					let depositAmount = readline.question("Please enter the deposit amount: ");
					
					// Convert to integer
					intAmount = +depositAmount;
					
					done = validateAmount(intAmount);

					if(!done){
						console.log("That is not a valid number.");
					}	
				}

			// Deposit the money	
			/*
			Trying to ensure that user can only deposit to an exisintg account
			If noexistent, should have exception error
			*/

				account.deposit(intAmount);			
				console.log("Updated account information: ");
				account.printAcct();
			}
		}
		// No valid bank accounts
		else
		{
			console.log("\nSorry, you currently do not have any open accounts with us\n");
		}
	}

	// ------------------------------------------------------
	// The UI for withdrawing the money
	// ------------------------------------------------------
	this.withdrawUI = function(customer)
	{	
		// Show all accounts of the user
		this.viewAccounts(customer);
		
		// Get the account choice
		let accountIndex = readline.question("Please select an account by entering a choice (e.g., enter 1 for the first account) ");
		
		// Get the account based on index
		let account = customer.getAccount(accountIndex - 1);	
		
		// Get the withdraw amount
		// Austin now checks if withdraw amount is NaN or negative
		let withdrawAmount = -5;
		let intAmount = 0;
		let done = false;
			
		if(account)
		{
			while (!done)
			{
				let withdrawAmount = readline.question("Please enter the deposit amount: ");
					
				// Convert to integer
				intAmount = +withdrawAmount;
					
				done = validateAmount(intAmount);

				if(!done){
					console.log("That is not a valid number.");
				}	
			}
			
			account.withdraw(intAmount);			
			console.log("Updated account information: ");
			account.printAcct();

		
		}				
		// No valid bank accounts
		else
		{
			console.log("\nSorry, you currently do not have any open accounts with us\n");
		}
	}

	
	// -----------------------------------------------------
	// The UI for transferring the money
	// @param customer - the customer for whom to perform the
	// transaction
	// -----------------------------------------------------
	this.transferUI = function(customer)
	{
		
		// Show the account information
		this.viewAccounts(customer);
		
		let accounts = customer.getAccounts();
		// The account number
		let acctNum = 0;
		
		// Gets number of accounts
		for(account of accounts)
		{
			acctNum++;
		}	
		// Get the source account
		let input = 0;
		let activeAccount1 = 0;
		let activeAccount2 = 0;
		let done = false;
		
		// Austin acctNum ensures that there are at least 2 accounts to transfer
		if(acctNum >= 2){
			// Austin checks if choice is not an account
			while (!done || activeAccount1 <= 0 || activeAccount1 > acctNum)
			{
				// Get the source account
				accountIndex = readline.question("Please select the source account by entering a choice (e.g., enter 1 for the first account) ");
				// Convert to integer
				activeAccount1 = +accountIndex;
					
				done = validateAmount(activeAccount1);
				if(!done){
					console.log("That is not a valid account number.");
				}	
			}
		
			// Get the source account based on index
			let srcAccount = customer.getAccount(activeAccount1 - 1);
			
			done = false;
			while (!done || activeAccount2 <= 0 || activeAccount2 > acctNum)
			{
				// Get the destination account
				accountIndex = readline.question("Please select the destination by entering a choice (e.g., enter 1 for the first account) ");
				// Convert to integer
				activeAccount2 = +accountIndex;
				console.log(activeAccount2);
				done = validateAmount(activeAccount2);
				
				
				if(!done){
					console.log("That is not a valid account number.");
				}	
				if(activeAccount1 == activeAccount2){
					console.log("Account already selected, try another.");
					done = false;
				}
			}
		
			// Get the destination account based on index
			let dstAccount = customer.getAccount(activeAccount2 - 1);		
			
			// Get the transfer amount
			let transferAmount = 0;
			let intAmount = 0;
			done = false;
			
			while (!done)
			{
				transferAmount = readline.question("Please enter the transfer amount: ");
					
				// Convert to integer
				intAmount = +transferAmount;
					
				done = validateAmount(intAmount);

				if(!done){
					console.log("That is not a valid number.");
				}	
			}
			
			//Austin Checks if account has enough money to transfer
			if(parseFloat(srcAccount.acctBalance) >= parseFloat(transferAmount)) {
				// Withdraw the money from the source account
				srcAccount.withdraw(transferAmount);
	
				// Deposit the money
				dstAccount.deposit(transferAmount);			
				console.log("Updated account information: ");
				srcAccount.printAcct();
				console.log("\n");
				dstAccount.printAcct();
			}
			else { 
				console.log("Account does not have enough money. Process voided."); 
			} 
		}
		else {
			console.log("Not enough accounts to transfer. Process voided."); 
		}
	}
		
	// ---------------------------------------------
	// Shows all the user accounts
	// @param user - the user whose accounts to view
	// ----------------------------------------------
	this.showAccounts = function(user)
	{
		// Get the accounts
		let accounts = user.getAccounts();
		
		console.log(accounts);
			
		// The account number
		let acctNum = 0;
		
		// Print all the accounts
		for(account of accounts)
		{
			console.log(acctNum, account.getName(), " ", account.getBalance())
		}
	}
	
	// --------------------------------------------
	// Returns the customer based on the user name
	// @param userName - the user name
	// @return - the user name
	// --------------------------------------------
	this.getCustomer = function(userName) 
	{ 
		return this.customers[userName]; 
	}
	
	// Opens the bank for business.
	this.start = function()
	{
		// Keep running
		while(true) 
		{
			this.masterChoice();
			
			// Clear screen
			clearScreeen();
		}
	}
	
	//closes a specific account- jason
	this.closeAccount= function(user)
	{
		// Get the accounts
		let accounts = user.getAccounts();
		console.log(user.getAccount());
		// The account counter
		let accountNum = 1;
			
		// Print the accounts
		for(account of accounts)
		{

			console.log("Account ", accountNum);
			account.printAcct();
			
			// Next account
			accountNum += 1;
		}
		accountNum -= 1;
		let removeAccount = -5;
		while (isNaN(removeAccount) || (removeAccount <= 0) || (removeAccount > accountNum)){
			removeAccount = readline.question("which account would you like to close: ")
			
			if(isNaN(removeAccount) || (removeAccount <= 0) || (removeAccount > accountNum)){
				console.log("That is not a valid account number.");
			}	
		}
		//reduces it by 1 for correct array spot
		removeAccount -= 1;
	    this.accounts = user.accounts.splice(removeAccount,1)
	}		
}

// ---- Sample Test Code --------

// Create three customers
let c1 = new Customer("mike", "123");
let c2 = new Customer("pike", "234");
let c3 = new Customer("bike", "678");

// Add accounts to each customer
c1.addAccount(new Account("bills", 100, "savings"));
c1.addAccount(new Account("dills", 200, "checking"));

c2.addAccount(new Account("wills", 300, "savings"));
c2.addAccount(new Account("kills", 400, "checking"));

c3.addAccount(new Account("chills", 300, "savings"));
c3.addAccount(new Account("thrills", 400, "checking"));

// Create a list of customers
let customers = [c1, c2, c3];

// Create a bank object
let myBank = new Bank("Kitty Bank", customers);


myBank.start();
