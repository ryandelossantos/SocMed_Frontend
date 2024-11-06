import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

export default function Login() {
  return (
    <main className="w-screen h-screen  flex justify-center items-center">
      <div className="rounded-sm border-2 border-black shadow-black flex  gap-5">
        <Tabs defaultValue='login' className="w-1/4">
          <TabsList>
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          <TabsContent value="login" className="w-[400px]">
            <Card className="w-">
              <CardHeader>
                <CardTitle>Login</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    className="border-2 border-black"
                    id="email"
                    defaultValue="Email"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    className="border-2 border-black"
                    id="password"
                    defaultValue="Password"
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="mx-auto">Login</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="register" className="w-[400px]">
            <Card>
              <CardHeader>
                <CardTitle>Register</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="display_name">Display Name</Label>
                  <Input
                    className="border-2 border-black"
                    id="display_name"
                    defaultValue="Display Name"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    className="border-2 border-black"
                    id="email"
                    defaultValue="email"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    className="border-2 border-black"
                    id="password"
                    defaultValue="Password"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="confirm_password">Confirm Password</Label>
                  <Input
                    className="border-2 border-black"
                    id="confirm_password"
                    defaultValue="confirm_password"
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="mx-auto">Signup</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
