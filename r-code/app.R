library(data.table)
library(shiny)
library(ggplot2)
library(dplyr)
library(tidyr)


#a <- fread("~/Documents/Scripts/tagStore/data_dumps/f_tags_melted_weekly.csv")
#freqOrder <- c("inactive","new","low_frequency","medium_frequency","high_frequency","very_high_frequency")



a <- fread("~/Downloads/data2.csv")
fertiOrder <- c("Fertilizer1","Fertilizer2")
seedOrder <- c("Seed1","Seed2")
waterOrder <- c("Borewells","Canal","Drip")
names(a) <- c("Month","Farmer","Fertilizer","Water","Seeds","Land","Lots","PricePerLot")

a$yield <- a$Lots/a$Land

# start coding the user interface with the fluid page design
ui <- shinyUI(
  fluidPage(
    fluidRow(
      column(width = 10, # width of first column 
             style = "font-size: 25pt; width = 100", # font size etc.
             tags$strong("BLOTS : Farmer Intelligence Platform")), # "tags" is for using html-functions within the 
      column(width = 2) # add image from url
    ),
    sidebarPanel(style = "background-color: #78d9c9;", # choose background color
                 tags$style(type='text/css',
                            ".selectize-input { font-size: 12pt; line-height: 13pt;} 
                            .selectize-dropdown { font-size: 12pt; line-height: 13pt; }"),
                 width = 3, # set panel width
                 checkboxGroupInput("Fertilizer", # name of this input to access it later in the server part
                                    label=HTML('<p style="color:white; font-size: 12pt"> Fertilizer </p>'),
                                    choices=fertiOrder, # adopt the choices to be displayed from our ordered
                                    selected = fertiOrder), # make all air pollutants to the default selected
                 
                 # add second input menue for the years
                 selectInput("Month",
                             label=HTML('<p style="color:white; font-size: 12pt"> Month </p>'), choices=unique(a$Month),
                             multiple = TRUE, # make it possible to select more than one year
                             selected = c(1:31)), # make all years to the default selected
                 # add a help text, for example explaining how to use this select menues
                 helpText(HTML('<p style="color:white; font-size: 9pt">choose tags by clicking the check boxes, exclude months with a click and the backspace key</p>'))
                 ),
    mainPanel(
      tabsetPanel(type = "tabs", 
                  tabPanel("Yield vs Months", # name as displayed on the tab
                           plotOutput("plot1"), # name of output you'll use in the server part 
                           style = "width:100%"),
                  
                  #tabPanel("Total 4 Month Active Users", # name as displayed on the tab
                  #        plotOutput("plot2"), # name of output you'll use in the server part 
                  #       style = "width:100%"),
                  
                  #                  tabPanel("Bookings", # name as displayed on the tab
                  #                          plotOutput("plot3"), # name of output you'll use in the server part 
                  #                         style = "width:100%"),
                  
                  tabPanel("Price Per Lot Vs Months", # name as displayed on the tab
                           plotOutput("plot4"), # name of output you'll use in the server part 
                           style = "width:100%")
      )
    )
  ))




# start coding the server part
server <- shinyServer(function(input, output) {
  # reactive operations
  data <- reactive({
    
    #validate( # error message, if no input is selected, try it in the app by unchecking all the pollutants
    # need(input$frequency_tags != "", "Please select at least one air pollutant"),
    #need(input$wk != "", "Please select at least one year")
    #)
    # filter data for plot dependending on reactive data input with the filter()-function of dplyr
    plotdata <- a  %>%
      as.data.frame() %>%
      # the content of "input$pollutants" changes whenever the user changes the input! 
      filter(Fertilizer %in% input$Fertilizer & Month %in% input$Month) 
    scalecalc <- plotdata %>%
      group_by(Month) %>%
      summarize(value = mean(yield))
    # create dataset that contains "optimized" labelling maximum and steps of the y-axis 
    #print(scalecalc)
    scalemax <- 2
    scalesteps <- 0.2 # steps of the labelling
    # important: make a list of the reactive results to be used for building the outputs
    list(plotdata = plotdata)
    #     scalemax = scalemax,
    #     scalesteps = scalesteps
    #)
  })
  
  
  
  # build the plot
  output$plot1 <- renderPlot({
    # data = data()$plotdata!
    myplot <- ggplot(data()$plotdata, aes(x =as.factor(Month), y=yield, fill=factor(Fertilizer, levels=fertiOrder), order=Fertilizer))+geom_bar(stat="identity")+
      xlab("Months") + 
      ylab("Lots / Area ") +
      theme_minimal() +
      ggtitle("Yield by Fertilizers\n") +
      guides(fill=guide_legend(title="Fertilizer", reverse = F)) + 
      theme(plot.title=element_text(family="Arial", face="bold", size=18), # style inscribing
            axis.text.x = element_text(angle = 0, family="Arial", size=13), 
            axis.text.y = element_text(angle = 0, family="Arial", size=13),
            axis.title.x = element_text(size=14, face="bold", vjust = -1),
            axis.title.y = element_text(size=14, face="bold", vjust = 2)
      ) +  
      scale_fill_manual(values = c("Fertilizer1" = "#e74c3c", "Fertilizer2" = "#3498db"), drop = F)
    
    print(myplot)
  })
  output$plot4 <- renderPlot({
    # data = data()$plotdata!
    myplot <- ggplot(data()$plotdata, aes(x =as.factor(Month), y=PricePerLot, fill=factor(Fertilizer, levels=fertiOrder), order=Fertilizer))+geom_bar(stat="identity",position = "dodge")+
      xlab("Months") + 
      ylab("Price per Lot") +
      theme_minimal() +
      ggtitle("Price Per Lot By Fertilizer\n") +
      guides(fill=guide_legend(title="Fertilizer", reverse = F)) + 
      theme(plot.title=element_text(family="Arial", face="bold", size=18), # style inscribing
            axis.text.x = element_text(angle = 0, family="Arial", size=13), 
            axis.text.y = element_text(angle = 0, family="Arial", size=13),
            axis.title.x = element_text(size=14, face="bold", vjust = -1),
            axis.title.y = element_text(size=14, face="bold", vjust = 2)
      ) + 
      scale_fill_manual(values = c("Fertilizer1" = "#e74c3c", "Fertilizer2" = "#3498db"), drop = F)
    
    print(myplot)
  })
})  



shinyApp(ui = ui, server = server)