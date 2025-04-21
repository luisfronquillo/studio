"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const [account, setAccount] = useState<{
    email?: string;
    balance: number;
    transactions: { date: string; amount: number; type: "deposit" | "send" | "receive"; otherParty: string }[];
  }>({ balance: 0, transactions: [] });
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [createEmail, setCreateEmail] = useState("");
  const [createPassword, setCreatePassword] = useState("");
  const [topUpAmount, setTopUpAmount] = useState("");
  const [sendAmount, setSendAmount] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");
  const { toast } = useToast();
  const [showCreateAccount, setShowCreateAccount] = useState(false);

  const handleAccountCreation = () => {
    if (createEmail && createPassword) {
      // Simulate account creation (in real app, this would be a database call)
      setAccount({ ...account, email: createEmail, balance: 0, transactions: [] });
      toast({
        title: "Account created.",
        description: "Your account has been successfully created.",
      });
      setShowCreateAccount(false); // Hide the create account form after successful creation
    } else {
      toast({
        variant: "destructive",
        title: "Error creating account.",
        description: "Please enter an email and password.",
      });
    }
  };

  const handleLogin = () => {
    if (loginEmail && loginPassword) {
      // Simulate login (in real app, this would be a database call)
      setAccount({ ...account, email: loginEmail, balance: 0, transactions: [] });
      toast({
        title: "Logged in.",
        description: "You have been successfully logged in.",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Error logging in.",
        description: "Please enter your email and password.",
      });
    }
  };

  const handleTopUp = () => {
    const amount = parseFloat(topUpAmount);
    if (!isNaN(amount) && amount > 0) {
      setAccount({
        ...account,
        balance: account.balance + amount,
        transactions: [
          ...account.transactions,
          { date: new Date().toLocaleDateString(), amount: amount, type: "deposit", otherParty: "Self" },
        ],
      });
      setTopUpAmount("");
      toast({
        title: "Top up successful.",
        description: `Successfully topped up $${amount}.`,
      });
    } else {
      toast({
        variant: "destructive",
        title: "Error topping up.",
        description: "Please enter a valid amount to top up.",
      });
    }
  };

  const handleSendMoney = () => {
    const amount = parseFloat(sendAmount);
    if (!isNaN(amount) && amount > 0 && account.balance >= amount && recipientEmail) {
      setAccount({
        ...account,
        balance: account.balance - amount,
        transactions: [
          ...account.transactions,
          { date: new Date().toLocaleDateString(), amount: amount, type: "send", otherParty: recipientEmail },
        ],
      });
      setSendAmount("");
      setRecipientEmail("");
      toast({
        title: "Money sent.",
        description: `Successfully sent $${amount} to ${recipientEmail}.`,
      });
    } else {
      toast({
        variant: "destructive",
        title: "Error sending money.",
        description: "Insufficient balance or invalid amount/recipient.",
      });
    }
  };

  const handleLogout = () => {
    setAccount({ balance: 0, transactions: [] });
    setLoginEmail("");
    setLoginPassword("");
    toast({
      title: "Logged out.",
      description: "You have been successfully logged out.",
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl font-bold mb-4">PocketSend</h1>

      {!account.email ? (
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="w-full max-w-md p-4">
            <CardHeader>
              <CardTitle>Login</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <Input
                type="email"
                placeholder="Email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
              />
              <Input
                type="password"
                placeholder="Password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              />
              <Button onClick={handleLogin}>Login</Button>
            </CardContent>
          </Card>

          {!showCreateAccount ? (
            <Button onClick={() => setShowCreateAccount(true)}>Create Account</Button>
          ) : (
            <Card className="w-full max-w-md p-4">
              <CardHeader>
                <CardTitle>Create Account</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <Input
                  type="email"
                  placeholder="Email"
                  value={createEmail}
                  onChange={(e) => setCreateEmail(e.target.value)}
                />
                <Input
                  type="password"
                  placeholder="Password"
                  value={createPassword}
                  onChange={(e) => setCreatePassword(e.target.value)}
                />
                <Button onClick={handleAccountCreation}>Create Account</Button>
              </CardContent>
            </Card>
          )}
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Account Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">${account.balance.toFixed(2)}</p>
              <Button onClick={handleLogout} variant="secondary">Logout</Button>
            </CardContent>
          </Card>

          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Top Up Balance</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <Input
                type="number"
                placeholder="Amount to top up"
                value={topUpAmount}
                onChange={(e) => setTopUpAmount(e.target.value)}
              />
              <Button onClick={handleTopUp}>Top Up</Button>
            </CardContent>
          </Card>

          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Send Money</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <Input
                type="email"
                placeholder="Recipient Email"
                value={recipientEmail}
                onChange={(e) => setRecipientEmail(e.target.value)}
              />
              <Input
                type="number"
                placeholder="Amount to send"
                value={sendAmount}
                onChange={(e) => setSendAmount(e.target.value)}
              />
              <Button onClick={handleSendMoney}>Send Money</Button>
            </CardContent>
          </Card>

          <Card className="w-full max-w-md col-span-full">
            <CardHeader>
              <CardTitle>Transaction History</CardTitle>
            </CardHeader>
            <CardContent className="overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Other Party</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {account.transactions.map((transaction, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{transaction.date}</TableCell>
                      <TableCell>${transaction.amount.toFixed(2)}</TableCell>
                      <TableCell>{transaction.type}</TableCell>
                      <TableCell>{transaction.otherParty}</TableCell>
                    </TableRow>
                  ))}
                  {account.transactions.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center">
                        No transactions yet.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
