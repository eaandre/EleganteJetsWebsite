"use client"

import { useState, useEffect } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useFieldArray } from "react-hook-form"
import * as z from "zod"
import format from "date-fns/format"
import { CalendarIcon, Plane, Car,  PlaneLanding, PlaneTakeoff, Mail, Phone, User, MessageSquare, Plus, Trash2 } from 'lucide-react'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Form, FormControl,  FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const legSchema = z.object({
  from: z.string().min(2, { message: "From location is required" }),
  to: z.string().min(2, { message: "To location is required" }),
  date: z.date({ required_error: "Date is required" }),
})

const formSchema = z.object({
  tripType: z.enum(["one-way", "round-trip", "multi-leg", "luxe-vehicle"]),
  legs: z.array(legSchema).min(1, { message: "At least one leg is required" }),
  preferredJetType: z.string().min(1, { message: "Preferred jet type is required" }),
  pickupLocation: z.string().min(2, { message: "Pickup location is required" }),
  dropoffLocation: z.string().min(2, { message: "Dropoff location is required" }),
  pickupDateTime: z.date({ required_error: "Pickup date and time is required" }),
  returnDateTime: z.date({ required_error: "Return date and time is required" }),
  preferredCarType: z.string().min(1, { message: "Preferred car type is required" }),
  additionalRequests: z.string().optional(),
  name: z.string().min(2, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phoneNumber: z.string().min(10, { message: "Invalid phone number" }),
})

const jetTypes = ["Light Jet", "Midsize Jet", "Heavy Jet"]
const carTypes = ["Luxury Sedan", "SUV", "Sports Car", "Limousine", "Van"]

export function EnhancedPricingWidget() {
  const [tripType, setTripType] = useState<"one-way" | "round-trip" | "multi-leg" | "luxe-vehicle">("one-way")
  const [showContactFields, setShowContactFields] = useState(false)
  const [showThankYouMessage, setShowThankYouMessage] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tripType: "one-way",
      legs: [{ from: "", to: "", date: new Date() }],
      preferredJetType: "",
      pickupLocation: "",
      dropoffLocation: "",
      pickupDateTime: new Date(),
      returnDateTime: new Date(),
      preferredCarType: "",
      additionalRequests: "",
      name: "",
      email: "",
      phoneNumber: "",
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "legs",
  })

  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === 'tripType') {
        form.reset({
          tripType: value.tripType,
          legs: [{ from: "", to: "", date: new Date() }],
          preferredJetType: "",
          pickupLocation: "",
          dropoffLocation: "",
          pickupDateTime: new Date(),
          returnDateTime: new Date(),
          preferredCarType: "",
          additionalRequests: "",
          name: "",
          email: "",
          phoneNumber: "",
        })
        setShowContactFields(false)
      }
      
      const requiredFields = getRequiredFields(tripType)
      const allFieldsFilled = requiredFields.every(field => !!form.getValues(field as keyof z.infer<typeof formSchema>))
      setShowContactFields(allFieldsFilled)
    })
    return () => subscription.unsubscribe()
  }, [form, tripType])

  function getRequiredFields(type: string) {
    switch (type) {
      case 'one-way':
        return ['legs.0.from', 'legs.0.to', 'legs.0.date', 'preferredJetType']
      case 'round-trip':
        return ['legs.0.from', 'legs.0.to', 'legs.0.date', 'legs.1.date', 'preferredJetType']
      case 'multi-leg':
        return ['legs', 'preferredJetType']
      case 'luxe-vehicle':
        return ['pickupLocation', 'dropoffLocation', 'pickupDateTime', 'returnDateTime', 'preferredCarType']
      default:
        return []
    }
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    // Here you would typically send this data to your backend or a third-party API
    setShowThankYouMessage(true)
    form.reset()
    setTimeout(() => {
      setShowThankYouMessage(false)
    }, 5000)
  }

  return (
    <Card className="w-full max-w-4xl mx-auto bg-card text-card-foreground">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-card-foreground">Get Your Personalized Quote</CardTitle>
        <CardDescription className="text-card-foreground">Tailor your premium travel experience</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="one-way" onValueChange={(value) => setTripType(value as "one-way" | "round-trip" | "multi-leg" | "luxe-vehicle")}>
          <TabsList className="grid w-full grid-cols-4 bg-muted border border-border rounded-t-md">
            <TabsTrigger 
              value="one-way" 
              className="text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-tl-md"
            >
              One-Way
            </TabsTrigger>
            <TabsTrigger 
              value="round-trip" 
              className="text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Round-Trip
            </TabsTrigger>
            <TabsTrigger 
              value="multi-leg" 
              className="text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Multi-Leg
            </TabsTrigger>
            <TabsTrigger 
              value="luxe-vehicle" 
              className="text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-tr-md"
            >
              Luxe Vehicle
            </TabsTrigger>
          </TabsList>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-8">
              <TabsContent value="one-way">
                <OneWayTripForm form={form} />
              </TabsContent>
              <TabsContent value="round-trip">
                <RoundTripForm form={form} />
              </TabsContent>
              <TabsContent value="multi-leg">
                <MultiLegTripForm form={form} fields={fields} append={append} remove={remove} />
              </TabsContent>
              <TabsContent value="luxe-vehicle">
                <LuxeVehicleRentalForm form={form} />
              </TabsContent>
              {showContactFields && <ContactFields form={form} />}
              <div className="flex justify-end">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        type="submit" 
                        className="bg-primary text-primary-foreground hover:bg-primary/80 transition-colors font-semibold py-2 px-4 rounded-md shadow-md"
                      >
                        {tripType === "luxe-vehicle" ?
                          <><Car className="mr-2 h-4 w-4" /> Get Luxe Vehicle Quote</> :
                          <><Plane className="mr-2 h-4 w-4" /> Get Flight Quote</>
                        }
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Click to receive your personalized luxury quote</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </form>
          </Form>
        </Tabs>
        {showThankYouMessage && (
          <div className="thank-you-message mt-8">
            <h3 className="text-2xl font-bold mb-2">Thank you for your request!</h3>
            <p className="text-lg">
              Our team will get back to you shortly with a personalized quote for your luxury travel experience.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function OneWayTripForm({ form }: { form: ReturnType<typeof useForm<z.infer<typeof formSchema>>> }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="legs.0.from"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <PlaneTakeoff className="h-4 w-4 text-secondary" />
                From
              </FormLabel>
              <FormControl>
                <Input placeholder="Enter departure location" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="legs.0.to"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <PlaneLanding className="h-4 w-4 text-secondary" />
                To
              </FormLabel>
              <FormControl>
                <Input placeholder="Enter destination location" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="legs.0.date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4 text-secondary" />
                Departure Date
              </FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date < new Date(new Date().setHours(0, 0, 0, 0))
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="preferredJetType"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <Plane className="h-4 w-4 text-secondary" />
                Preferred Jet Type
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select jet type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {jetTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <FormField
        control={form.control}
        name="additionalRequests"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-secondary" />
              Additional Requests
            </FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Enter any additional requests or requirements" 
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}

function RoundTripForm({ form }: { form: ReturnType<typeof useForm<z.infer<typeof formSchema>>> }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="legs.0.from"
          render={({ field }) => (
            <FormItem>
              <FormLabel>From</FormLabel>
              <FormControl>
                <Input placeholder="Enter departure location" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="legs.0.to"
          render={({ field }) => (
            <FormItem>
              <FormLabel>To</FormLabel>
              <FormControl>
                <Input placeholder="Enter destination location" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="legs.0.date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Departure Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date < new Date(new Date().setHours(0, 0, 0, 0))
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="legs.1.date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Return Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date < new Date(new Date().setHours(0, 0, 0, 0))
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <FormField
        control={form.control}
        name="preferredJetType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Preferred Jet Type</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select jet type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {jetTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="additionalRequests"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Additional Requests</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Enter any additional requests or requirements" 
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}

function MultiLegTripForm({ form, fields, append, remove }: { form: ReturnType<typeof useForm<z.infer<typeof formSchema>>>, fields: { id: string; from: string; to: string; date: Date }[], append: (value: { from: string; to: string; date: Date }) => void, remove: (index: number) => void }) {
  return (
    <div className="space-y-6">
      {fields.map((field: { id: string; from: string; to: string; date: Date }, index: number) => (
        <div key={field.id} className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Leg {index + 1}</h3>
            {index > 0 && (
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={() => remove(index)}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Remove Leg
              </Button>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name={`legs.${index}.from`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>From</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter departure location" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`legs.${index}.to`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>To</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter destination location" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`legs.${index}.date`}
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date < new Date(new Date().setHours(0, 0, 0, 0))
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="mt-2"
        onClick={() => append({ from: "", to: "", date: new Date() })}
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Another Leg
      </Button>
      <FormField
        control={form.control}
        name="preferredJetType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Preferred Jet Type</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select jet type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {jetTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="additionalRequests"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Additional Requests</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Enter any additional requests or requirements" 
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}

function LuxeVehicleRentalForm({ form }: { form: ReturnType<typeof useForm<z.infer<typeof formSchema>>> }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="pickupLocation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pickup Location</FormLabel>
              <FormControl>
                <Input placeholder="Enter pickup location" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dropoffLocation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dropoff Location</FormLabel>
              <FormControl>
                <Input placeholder="Enter dropoff location" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="pickupDateTime"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Pickup Date & Time</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP HH:mm")
                      ) : (
                        <span>Pick a date and time</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date < new Date(new Date().setHours(0, 0, 0, 0))
                    }
                    initialFocus
                  />
                  <div className="p-3 border-t border-gray-100">
                    <Input
                      type="time"
                      onChange={(e) => {
                        const date = new Date(field.value);
                        const [hours, minutes] = e.target.value.split(':');
                        date.setHours(parseInt(hours), parseInt(minutes));
                        field.onChange(date);
                      }}
                    />
                  </div>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="returnDateTime"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Return Date & Time</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP HH:mm")
                      ) : (
                        <span>Pick a date and time</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date < new Date(new Date().setHours(0, 0, 0, 0))
                    }
                    initialFocus
                  />
                  <div className="p-3 border-t border-gray-100">
                    <Input
                      type="time"
                      onChange={(e) => {
                        const date = new Date(field.value);
                        const [hours, minutes] = e.target.value.split(':');
                        date.setHours(parseInt(hours), parseInt(minutes));
                        field.onChange(date);
                      }}
                    />
                  </div>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <FormField
        control={form.control}
        name="preferredCarType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Preferred Car Type</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select car type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {carTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="additionalRequests"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Additional Requests</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Enter any additional requests or requirements" 
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}

function ContactFields({ form }: { form: ReturnType<typeof useForm<z.infer<typeof formSchema>>> }) {
  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2">
              <User className="h-4 w-4 text-secondary" />
              Name
            </FormLabel>
            <FormControl>
              <Input placeholder="Enter your full name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-secondary" />
              Email Address
            </FormLabel>
            <FormControl>
              <Input type="email" placeholder="Enter your email address" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="phoneNumber"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-secondary" />
              Phone Number
            </FormLabel>
            <FormControl>
              <Input placeholder="Enter your phone number" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}

