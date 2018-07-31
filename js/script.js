
function getText(obj){

    var info=obj,index=info.search('http');

    if (index != -1){
        info=info.substring(0,index);
        }
    return info;
    
}
function getLink(obj){
var info=obj;
if(obj.length>0){
var parts=obj.split('$$$');
if(parts[1].indexOf('###')!=-1){
    var link = parts[1].split("###");
    return link[1];
}
else{
    return ""
}
}
else
return "";
}

function getLinkText(obj){
    var info=obj;
    if(info.length>0){
        var parts=obj.split('$$$');
        if(parts[1].indexOf('###')!=-1){
            var link = parts[1].split("###");
            return link[0];
        }
        else{
            return "";
        }
    }
    else
        return "";
}

function getFontSizeInPX(l,r){
            if(l < 3)
                l=3;
            var size = r/4;
            size *= 10 / l;
            return Math.round(size);
  }

Math.radians = function(degrees) {
  return degrees * Math.PI / 180;
  };

  //AJAX parser------------------------------------------------

function data(section){
    // to be called as data(patientID,'MendelianGenes')
    $.getJSON("/url"+patientID,function(data){
        console.log(data);
        return data;
    });
    return {};
}



var tempWindowWidth = mainWidth;
var tempWindowHeight = mainHeight;

var isMendilianZoomed = false;
var isTargetResequencingZoomed = false;
var isGeneticRiskMapZoomed =false;
var isExomeSequencingZoomed = false;
var isProgranulinZoomed = false;
var isGenomeSequencingZoomed = false; 
var isGeneExpressionZoomed = false;
var isCsfZoomed = false;
var isIpsCellsZoomed = false;
var isIndicatorsZoomed = false;


var globalScaleFactor =2;
var componentsHeights = {"mendelian":1,"targetResequencing":2,
                         "exomeSequencing":3,"genecticRiskMap":4,
                         "progranulin":5,"genomeSequencing":6,
                         "geneExpression":7,"csf":8,"ipsCells":9};


var mainHeight,mainWidth;


var mendilianData=""
var targetResequencingData=""
var exomeSequencingData=""
var genecticRiskMapData=""
var progranulinData=""
var genomeSequencingData=""
var geneExpressionData=""
var csfData=""
var ipsCellsData=""

function dashboard(divID,patientID){
        var data={"mendilian":[{"info": "$$$rs929867###http://www.ncbi.nlm.nih.gov/projects/SNP/snp_ref.cgi?rs=rs929867", "type": "Risk Factor", "label": "FUS"}, {"info": "$$$rs11405###http://www.ncbi.nlm.nih.gov/projects/SNP/snp_ref.cgi?rs=rs11405", "type": "Risk Factor", "label": "PSEN2"}, {"info": "c.G1627C:p.E543Q$$$", "type": "Mutation", "label": "APP"}, {"info": "$$$rs116917239###http://www.ncbi.nlm.nih.gov/projects/SNP/snp_ref.cgi?rs=rs116917239", "type": "Risk Factor", "label": "MAPT"}, {"info": "$$$", "type": "Negative", "label": "C9ORF72"}, {"info": "intronic$$$", "type": "Risk Factor", "label": "GRN"}, {"info": "$$$rs165932###http://www.ncbi.nlm.nih.gov/projects/SNP/snp_ref.cgi?rs=rs165932", "type": "Risk Factor", "label": "PSEN1"}],"genetic":[{"type": "Risk Factor", "name": "CD2AP_1", "size": 40}, {"type": "Risk Factor", "name": "CR1_1", "size": 40}, {"type": "Negative", "name": "CUGBP2_1", "size": 25}, {"type": "Negative", "name": "MAPT_A152T", "size": 25}, {"type": "Risk Factor", "name": "ApoE", "size": 40}, {"type": "Mutation", "name": "Do et al_1", "size": 50}, {"type": "Mutation", "name": "EIF2AK3_1", "size": 50}, {"type": "Negative", "name": "FAM47E_1", "size": 25}, {"type": "Negative", "name": "GRIN2A_1", "size": 25}, {"type": "Risk Factor", "name": "KCNQ3", "size": 40}, {"type": "Negative", "name": "KLOTHO_1", "size": 25}, {"type": "Negative", "name": "KLOTHO_2", "size": 25}, {"type": "Negative", "name": "KLOTHO_3", "size": 25}, {"type": "Negative", "name": "KLOTHO_4", "size": 25}, {"type": "Negative", "name": "LRRK2_15", "size": 25}, {"type": "Mutation", "name": "MCCC1_1", "size": 50}, {"type": "Negative", "name": "MOBP_1", "size": 25}, {"type": "Negative", "name": "Naj et al_1", "size": 25}, {"type": "Risk Factor", "name": "Naj et al_2", "size": 40}, {"type": "Risk Factor", "name": "Naj et al_3", "size": 40}],"target":[{"label":"APP","info":"text","type":"Not tested"},{"label":"PSEN1","info":"","type":"Negative"},{"label":"PSEN2","info":"text","type":"Negative"},{"label":"C9ORF72","info":"","type":"Negative"},{"label":"MAPT","info":"A152T","type":"Risk Factor"},{"label":"GRN","info":"Arg493X","type":"Mutation"},{"label":"TARDBP","info":"","type":"Negative"},{"label":"FUS","info":"Arg493X","type":"Mutation"},{"label":"APP","info":"text","type":"Not tested"},{"label":"PSEN1","info":"","type":"Negative"},{"label":"PSEN2","info":"text","type":"Negative"},{"label":"C9ORF72","info":"","type":"Negative"},{"label":"MAPT","info":"A152T","type":"Risk Factor"},{"label":"GRN","info":"Arg493X","type":"Mutation"},{"label":"TARDBP","info":"","type":"Negative"},{"label":"FUS","info":"Arg493X","type":"Mutation"},{"label":"APP","info":"text","type":"Not tested"},{"label":"PSEN1","info":"","type":"Negative"},{"label":"PSEN2","info":"text","type":"Negative"},{"label":"C9ORF72","info":"","type":"Negative"},{"label":"MAPT","info":"A152T","type":"Risk Factor"},{"label":"GRN","info":"Arg493X","type":"Mutation"},{"label":"TARDBP","info":"","type":"Negative"},{"label":"FUS","info":"Arg493X","type":"Mutation"},{"label":"APP","info":"text","type":"Not tested"},{"label":"PSEN1","info":"","type":"Negative"},{"label":"PSEN2","info":"text","type":"Negative"},{"label":"C9ORF72","info":"","type":"Negative"},{"label":"MAPT","info":"A152T","type":"Risk Factor"},{"label":"GRN","info":"Arg493X","type":"Mutation"},{"label":"TARDBP","info":"","type":"Negative"},{"label":"FUS","info":"Arg493X","type":"Mutation"},{"label":"APP","info":"text","type":"Not tested"},{"label":"PSEN1","info":"","type":"Negative"},{"label":"PSEN2","info":"text","type":"Negative"},{"label":"C9ORF72","info":"","type":"Negative"},{"label":"MAPT","info":"A152T","type":"Risk Factor"},{"label":"GRN","info":"Arg493X","type":"Mutation"},{"label":"TARDBP","info":"","type":"Negative"},{"label":"FUS","info":"Arg493X","type":"Mutation"},{"label":"APP","info":"text","type":"Not tested"},{"label":"PSEN1","info":"","type":"Negative"},{"label":"PSEN2","info":"","type":"Negative"},{"label":"C9ORF72","info":"","type":"Negative"},{"label":"MAPT","info":"A152T","type":"Risk Factor"},{"label":"GRN","info":"Arg493X","type":"Mutation"},{"label":"TARDBP","info":"","type":"Negative"},{"label":"FUS","info":"Arg493X","type":"Mutation"},{"label":"TARDBP","info":"","type":"Negative"},{"label":"FUS","info":"Arg493X","type":"Mutation"},{"label":"APP","info":"text","type":"Not tested"}]}
       
        var color={"Not tested":"#C6C6C3",Negative:"#66E186","Risk Factor":"#FD8009",Mutation:"#FA5151"};
        //Mouse roll + drag
        var zoom = d3.behavior.zoom()
            .scaleExtent([1, 10])
            .on("zoom", zoomed);

        function zoomed(){
          dashboardbody.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
        }

        mainWidth=window.innerWidth-16;
        mainHeight=window.innerHeight-16;

        svg=d3.select('#'+divID).append('svg')
                    .attr('width',mainWidth)
                    .attr('height',mainHeight).call(zoom).on("dblclick.zoom", null);

        svg.append('rect')
                .attr('height',mainHeight)
                .attr('width',mainWidth).attr('fill','#EFF6FE');

            

        var dashboardbody= svg.append('g').attr('width',"100%").attr('height','100%').attr('id','dash');

        mdata=data['mendilian'];
        var next_height=mendelian(dashboardbody, color, mdata);

        tdata = data['target'];
        next_height=targetResequencing(dashboardbody, color, next_height, tdata);

        edata = {"projects":[ "EVS","1KGP","ExAC"], "variants": [{name:"HSPA6 p. T297K", values:"T,T,T"}, {name:"HSPA6 p. T297K", values:"T,T,T"}, {name:"HSPA6 p. T297K", values:"T,T,T"}, {name:"HSPA6 p. T297K", values:"T,T,T"}, {name:"HSPA6 p. T297K", values:"T,T,T"}, {name:"HSPA6 p. T297K", values:"T,T,T"}, {name:"HSPA6 p. T297K", values:"T,T,T"}, {name:"HSPA6 p. T297K", values:"T,T,T"}, {name:"HSPA6 p. T297K", values:"T,T,T"},{name:"FUS 3’UTR", values:"F,T,F"}]};
        next_height=exomeSequencing(dashboardbody,next_height,edata);


        var next_height_col2=0;
        
        gdata = {"genetic":[{ "type":"Negative","name": "APOE_e2/3/4", "size": 3.685},{ "type": "Risk Factor","name": "BIN1", "size": 1.166},{ "type": "Negative","name": "CLU", "size": 0.879},     { "type":"Mutation","name": "ABCA7", "size": 1.1229},{ "type": "Risk Factor","name": "CR1", "size": 1.174},{ "type":"Mutation", "name": "PICALM", "size": 0.879},{ "type": "Risk Factor","name": "MS4A6A", "size": 0.904},{ "type":"Mutation","name": "CD33", "size": 0.893},{ "type": "Risk Factor", "name": "MS4A4E", "size": 1.079},{ "type":"Mutation","name": "C2DAAP", "size": 1.117}],
        "others":[{ "type":"Negative","name": "H1", "size": 3.685},{ "type":"Negative","name": "RAB38", "size": 1.155},{ "type":"Negative","name": "TMEM106B", "size": 1.115}]};
        next_height_col2 = geneRiskMap(dashboardbody,next_height_col2, color,gdata);

        indicator(dashboardbody,50,32,100,0,'Progranulin Levels(plasma)','50 ng/ml',next_height_col2);
        indicator(dashboardbody,21,69,100,1,' Other  Indicator','',next_height_col2);
        indicator(dashboardbody,36,48,100,2,' Other  Indicator','',next_height_col2);
        

        next_height_col2 +=  mainHeight*0.001*100;

        gedata ={};
        next_height_col2 = genomeSequencing(dashboardbody,next_height_col2, color,gedata);

        genedata={'Gene Expression':[{label:"Blood",info:"text",status:"T"},{label:"RNA",info:"http://example.com ",status:"T"},{label:"microarray",info:"text http://example.com ",status:"F"}]};
        next_height_col2 = geneExpression(dashboardbody,next_height_col2, color,genedata["Gene Expression"]);

        csfdata = {CSF:[{label:"APP",info:"A-beta 40",type:"Not tested"},{label:"PSEN1",info:"A-beta 42",type:"Negative"},{label:"PSEN2",info:"tau",type:"Negative"},{label:"PSEN2",info:"p-tau",type:"Negative"}]};
        next_height_col2 =  csf(dashboardbody,next_height_col2, color,csfdata["CSF"]);

        ipsdata = {'iPS':[{label:"Fibroblasts",info:"text",status:"T"},{label:"iPS",info:"http://example.com ",status:"T"},{label:"iPS-derived neurons",info:"text http://example.com ",status:"F"}]};
        next_height_col2 = ipsCells(dashboardbody,next_height_col2, color,ipsdata["iPS"]);

        

        if(next_height > next_height_col2)
            svg.attr('height',next_height);
        else
            svg.attr('height',next_height_col2);
  }
 
  setTimeout(function(){ document.getElementById('blocker').style.display='none'; }, 1700);

  dashboard('canvas','patientID');




function mendelian(divobj, color, data){

    var headerfontSizeInPX =(0.10)*(mainWidth*0.3/16)*5+'px';
    var radius=mainWidth*0.3/18;
    var legendRadius=radius/3;
    var width = parseFloat(mainWidth*0.40);
    var height=radius*4;
    var legendXPos=(data.length*radius*2.4)+4*radius;
    var cy=10;
    var fontSize=height/12;
    var topMargin = 20;
    margin_top=topMargin;
    cy=margin_top+height/2;
    next_height=height+margin_top;

    componentsHeights.mendelian = topMargin + height;
    margin_left=.05*mainWidth;
    g=divobj.append('g').attr('height',height)
        .attr('width',width).attr('id','mendelianBox').on('click',zoomMendillian);

    g.append('text')
        .attr('transform','translate('+margin_left+','+(margin_top-5.5)+')')
        .style('font-size',headerfontSizeInPX)
        .style('font-weight','bold')
        .text(' Mendelian Genes');
        
    g.append('rect')
        .attr('height',height)
        .attr('width',width)
        .attr('transform','translate('+margin_left+','+margin_top+')').attr('fill','#E2EEFF').attr('class','box');
    //i need the path here
    var section= g.append('g')
                       .attr('width',width)
                       .attr('transform','translate('+margin_left+',0)');
    var links= g.append('g')
                       .attr('width',width)
                       .attr('transform','translate('+margin_left+',0)');
    var legend= g.append('g')
                      .attr('width',width)
                      .attr('transform','translate('+margin_left+',0)');;
                       
    var label= g.append('g')
                     .attr('width',width)
                     .attr('transform','translate('+margin_left+',0)');

    section.selectAll('circle')
            .data(data)
            .enter()
            .append('circle')
            .attr('cx',function(d,i){ return (i*radius*2.4)+radius+20;})
            .attr('cy',cy)
            .attr('r',radius)
            .attr('fill',function(d){return color[d['type']];});
            
         
    links.selectAll('text')
            .data(data)
            .enter()
            .append('text')
            .attr('x',function(d,i){ return (i*radius*2.4)+radius+20;})
            .style("text-anchor", "middle")
            .attr('y',cy+3)
            .style('font-size',function(d,i){
                if(getLinkText(d.info).length > 9)
                   return radius/4+'px';
                else
                 return radius/3+'px';
            })
            .text(function(d){ return getLinkText(d.info);}).attr('fill','blue')
            .on("click", function(d) {window.open(getLink(d.info)); });

    label.selectAll('text')
            .data(data)
            .enter()
            .append('text')
            .attr('x',function(d,i){ return (i*radius*2.4)+radius+20;})
            .style("text-anchor", "middle")
            .attr('y',(cy+(radius*1.7)))
            .style('font-size',function(d,i){return fontSize+'px'})
            .text(function(d){ return d.label;});
            

    legend.selectAll('circle')
            .data(Object.keys(color))
            .enter()
            .append('circle')
            .attr('cx',function(){ return legendXPos;})
            .attr('cy',function(d,i){ return margin_top+height*0.2+2*(legendRadius*i)+(i*(0.28*legendRadius));})
            .attr('r',legendRadius)
            .attr('fill',function(d){return color[d];});
            

    legend.selectAll('text')
            .data(Object.keys(color))
            .enter()
            .append('text')
            .attr('x',function(){ return legendXPos+1.5*legendRadius;})
            .attr('y',function(d,i){ return margin_top+height*0.2+2*(legendRadius*i)+(i*(0.28*legendRadius))+legendRadius/2;})
            .style('font-size',function(d){ return fontSize+'px';})
            .text(function(d){ return d;});
           

    return next_height;
           
}

function targetResequencing(divobj, color, next_height,data){
    margin_left=mainWidth*0.05;
    var headerfontSizeInPX =(0.10)*(mainWidth*0.3/16)*5+'px';
    var radius=mainWidth*0.3/18;
    var width = parseFloat(mainWidth*0.46);
    var height=radius*5.0;
    var cy=radius*0.8;
    var margin_top=35+next_height;
    componentsHeights.targetResequencing = margin_top + height;
    next_height=height+margin_top;
    var radius_circle=mainWidth*0.3/28;
    var diffBetweenCircle = 0.05*width;
    var firstHeader="";
g=divobj.append('g').attr('height',height)
        .attr('width',width).attr('id','targetResequencingBox').on('click',zoomTargetResequencing);

    g.append('text')
         .attr('x',0)
         .attr('y',margin_top-10)
        .style('font-size',function(d){
            firstHeader=this;
            return headerfontSizeInPX;
        })
        .style('font-weight','bold')
        .text(' Targeted Resequencing :').attr('transform','translate('+margin_left+',0)');;
        
    g.append('text')
        .attr('x',firstHeader.getComputedTextLength())
        .attr('y',margin_top-9)
        .style('font-size',headerfontSizeInPX)
        .text(' COMPLETED')
        .style('font-weight','bold')
        .attr('fill','#8ED53E').attr('transform','translate('+margin_left+',0)');
    g.append('rect')
        .attr('height',height)
        .attr('width',width).attr('fill','#E2EEFF')
        .attr('transform','translate('+margin_left+','+margin_top+')').attr('class','box');
    
    var section= g.append('g')
                .attr('width',width)
                .attr('transform','translate('+margin_left+','+margin_top+')');
   
   section.selectAll('circle')
            .data(data)
            .enter()
            .append('circle')
            .attr('cx',function(d,i){ return ((i%17)*radius_circle*2.4)+diffBetweenCircle;})
            .attr('cy',function(d,i){return (cy+(parseInt(i/17)*2.5*radius_circle));})
            .attr('r',radius_circle)
            .attr('fill',function(d){return color[d['type']];});
    
    section.selectAll('text')
            .data(data)
            .enter()
            .append('text')
            .attr('x',function(d,i){ return ((i%17)*radius_circle*2.4)+diffBetweenCircle;})
            .attr('y',function(d,i){return (cy+(parseInt(i/17)*2.5*radius_circle));})
            .style("text-anchor", "middle")
            .style('font-size',function(d,i){return getFontSizeInPX(getText(d.info).length,radius_circle)+'px'})
            .text(function(d){ return getText(d.info);});

    return next_height;
   
}

function exomeSequencing(divobj,next_height,data){
    
    var headerfontSizeInPX =(0.10)*(mainWidth*0.3/16)*5+'px';
    var radius=mainWidth*0.3/16;
    var width = parseFloat(mainWidth*0.30);
    
    var noofvariants=data.variants.length;
    
    var margin_top=35+next_height;
    componentsHeights.exomeSequencing=margin_top+6;
    var radius_circle=mainWidth*0.3/16;
    var exomeLabelX=0.5*width;
    
    var exomeLabelsXAxix=5;
    var exomeCircleRadius=mainWidth*0.3/36;
    var exomeYAxix=exomeCircleRadius*3;

    var yAxisPadding = exomeYAxix+exomeCircleRadius;
    var height=((noofvariants+3)*(exomeCircleRadius*2))+(noofvariants*(exomeCircleRadius/3));

    next_height=height+margin_top;
    var fontSize=exomeCircleRadius+'px';
    margin_left=0.05*mainWidth;
    var firstHeader = "";
    g=divobj.append('g').attr('height',height)
        .attr('width',width).attr('id','exomeSequencingBox').on('click',zoomExomeSequencing);
    g.append('text')
        .attr('transform','translate('+margin_left+','+(margin_top-6)+')')
        .style('font-size',function(d){
            firstHeader=this;
            return headerfontSizeInPX;
        })
        .style('font-weight','bold')
        .text(' Exome Sequencing:');

        g.append('text')
        .attr('x', margin_left +firstHeader.getComputedTextLength())
        .attr('y',margin_top-6)
        .style('font-size',headerfontSizeInPX)
        .style('font-weight','bold')
        .text(' COMPLETED')
        .attr('fill','#8ED53E');
    
    g.append('rect')
        .attr('height',height)
        .attr('width',width).attr('fill','#E2EEFF')
        .attr('transform','translate('+margin_left+','+margin_top+')').attr('class','box');
             
  var section= g.append('g')
                 .attr('width',width)
                 .attr('transform','translate('+margin_left+','+(margin_top)+')');

  
  var xAxisArray = new Array(3);
  xAxisArray[0]=exomeLabelX+margin_left;
  xAxisArray[1]=exomeLabelX+(4*exomeCircleRadius)+margin_left;
  xAxisArray[2]=exomeLabelX+(8*exomeCircleRadius)+margin_left;

    section.append('text')
        .style('font-size',fontSize)
        .text("Top Candidates:")
        .style("font-weight", "bold")
        .attr('x',exomeLabelsXAxix+margin_left)
        .attr('y',yAxisPadding/2);
        

    section.append('text')
        .style('font-size',fontSize)
        .text(data.projects[0])
        .attr("transform", "translate("+(xAxisArray[0]-exomeCircleRadius/2)+","+yAxisPadding+"),rotate(-30)");
                        
    section.append('text')
        .style('font-size',fontSize)
        .text(data.projects[1])
        .attr("transform", "translate("+(xAxisArray[1]-exomeCircleRadius/2)+","+yAxisPadding+"),rotate(-30)");
        
    section.append('text')
        .style('font-size',fontSize)
        .text(data.projects[2])
        .attr("transform", "translate("+(xAxisArray[2]-exomeCircleRadius/2)+","+yAxisPadding+"),rotate(-30)");
        
  var yAxixTransform=0  ; 
  var diffBetweenCircle = exomeCircleRadius/3;
  exomeYAxix=exomeCircleRadius*4;
  for(var i=1;i<=data.variants.length;i++)
  {
    
  var counter=0;
  yAxixTransform=margin_top+(i*exomeCircleRadius);
  section= g.append('g')
                 .attr('height',0)
                 .attr('width',width)
                 .attr('transform','translate('+margin_left+','+yAxixTransform+')');
  var colorType=data.variants[i-1].values.split(',');

  section.append('text')
        .style('font-size',fontSize)
        .text(data.variants[i-1].name)
        .attr('x',exomeLabelsXAxix)
        .attr('y',exomeYAxix+1.4*exomeCircleRadius);
        
  section.selectAll('circle')
        .data(data['projects'])
        .enter()
            .append('circle')
            .attr('cx',function(d,i){ return xAxisArray[i];})
            .attr('cy',exomeYAxix+exomeCircleRadius)
            .attr('r',exomeCircleRadius)
            .attr('fill',function(d){
               if(colorType[counter++]==="T")
                    return "#66E186"
                else
                    return "#FA5151";
            });
                
    exomeYAxix = exomeYAxix+exomeCircleRadius+diffBetweenCircle;
  }

  return next_height;
}

        function geneRiskMap(divobj,next_height_col2, color,data) {
        
        var sortOrder = -1; 
        var headerfontSizeInPX =(0.10)*(mainWidth*0.3/16)*5+'px';

        var data1=data.genetic.sort(function(a,b) { return parseFloat(b.size) - parseFloat(a.size) } );
        var data2=data.others.sort(function(a,b) { return parseFloat(b.size) - parseFloat(a.size) } );

        var margin = 80; //space in pixels from edges of SVG
        var margin_top =30 + next_height_col2
        var width = parseFloat(mainWidth*0.38);
        width +=0.01*width;
        var height =0;
        var noOfLeftCircles = data.genetic.length;
        var noOfRightCircles = data.others.length;
        var maxLeftCircleWidth=(width*0.60);
        var linearScale = d3.scale.linear().domain([0,data1[0].size*10]).range([0,maxLeftCircleWidth]);

        var np = [];
        var np2 = [];
        var otherMultiplier = 3;
        var firstCircleMultiplier =2;
        var circleSize = 0;

        for(var c1=0;c1<data1.length;c1++)
        {
                circleSize = data1[c1].size;
                item = {};
                item ["x"] = 0;
                item ["y"] = 0;
                if(circleSize > 2)
                    item ["r"] =linearScale(circleSize*firstCircleMultiplier)/2;
                else
                    item ["r"] =linearScale(circleSize*otherMultiplier)/2;
                
                np.push(item);

            if(data2[c1] != undefined)
            {
                circleSize = data2[c1].size;
                item1 = {};
                item1 ["x"] = 0;
                item1 ["y"] = 0;
               if(circleSize > 2)
                    item1 ["r"] =linearScale(data2[c1].size*firstCircleMultiplier)/2;
                else
                    item1 ["r"] =linearScale(data2[c1].size*otherMultiplier)/2;
                
                np2.push(item1);
            }
                
        } 
        
        var padding = width*.04; //space in pixels between circles
        var xAxisPadding= width*.02;
        var yAxixPadding = 0.01*width;
        np[0].x=np[0].r+padding;
        np[0].y=np[0].r+padding;

        var cX=0;cY=0;cR=0;
        var mainCircleX=np[0].x,mainCircleY=np[0].y,mainCircleRadius=np[0].r;
        var minRightCircleXpos=0;

        var angle=-15;
        var angleDecrementer = 30;
        var radiusMultiplier = 2;
        var rowCount = 0;

        for(var kk=1;kk<noOfLeftCircles;kk++)
        {
            cR=np[kk].r;
            cX=mainCircleX+mainCircleRadius*radiusMultiplier*Math.cos(Math.radians(angle));
            cY=mainCircleY+mainCircleRadius*radiusMultiplier*Math.sin(Math.radians(angle));

            if((cX-cR) < 0)
            {

                radiusMultiplier += 1;
                if(rowCount%2 ==0)
                    angle=0;
                else
                    angle=-15;

                cX=mainCircleX+mainCircleRadius*radiusMultiplier*Math.cos(Math.radians(angle));
                cY=mainCircleY+mainCircleRadius*radiusMultiplier*Math.sin(Math.radians(angle));
                rowCount += 1;
            }
            angle = angle + angleDecrementer;
           
            np[kk].x=cX;
            np[kk].y=cY;

            if(minRightCircleXpos == 0 || (np[kk].x+np[kk].r)>minRightCircleXpos)
                minRightCircleXpos=np[kk].x+np[kk].r;

            if(height == 0 || (np[kk].y+np[kk].r+yAxixPadding) > height)
            {
                height=np[kk].y+np[kk].r+yAxixPadding;
            }
        }

        angle = 140;
        radiusMultiplier = 2;
        angleDecrementer = 40;
        rowCount = 0;
        for(var kk=0;kk<noOfRightCircles;kk++)
        {
            if(kk==0)
            {
                np2[kk].r=np[kk].r;
                cX=width-np[kk].x-8;
                cY=np[kk].y;

                mainCircleX=cX;
                mainCircleY= cY;
                mainCircleRadius= np2[kk].r
                rowCount += 1;
            }
            else
            {
                cX=mainCircleX+mainCircleRadius*radiusMultiplier*Math.cos(Math.radians(angle));
                cY=mainCircleY+mainCircleRadius*radiusMultiplier*Math.sin(Math.radians(angle));
                angle = angle - angleDecrementer;
            }

            if((cX+np2[kk].r) > (mainCircleX+mainCircleRadius))
            {
                radiusMultiplier += 1;
                if(rowCount%2 ==0)
                    angle=140;
                else
                    angle=160;

                cX=mainCircleX+mainCircleRadius*radiusMultiplier*Math.cos(Math.radians(angle));
                cY=mainCircleY+mainCircleRadius*radiusMultiplier*Math.sin(Math.radians(angle));
                angle = angle - angleDecrementer;
                rowCount += 1;
            }

            np2[kk].x=cX;
            np2[kk].y=cY;
           
            if(height < (np2[kk].y+np2[kk].r+yAxixPadding))
                height = np2[kk].y+np2[kk].r+yAxixPadding;

        }
        
        componentsHeights.genecticRiskMap = margin_top + height;
        var margin_left=mainWidth*0.50;
        var margin_right=margin_left+60;//distance btween 2 bubble groups

        g=divobj.append('g').attr('height',height)
                .attr('width',width).attr('id','geneticRiskMapBox').on('click',zoomGeneticRiskMap);

        var box = g.append("rect").style("pointer-events", "all")
                    .attr({ "height": height, "width":width,"fill":"#E2EEFF",
                           "x":margin_left+margin, "y":margin_top,
                           "class":"box"
                    });
        g.append('text')
                .attr('transform','translate('+(margin_left+margin)+','+(margin_top-5.5)+')')
                .style('font-size',headerfontSizeInPX)
                .style('font-weight','bold')
                .text(' Genetic Risk Map');
            
        var bubbleGroup = g.append("g")
                .attr("class", "bubbles")
                .attr("transform", 
                      "translate(" + [margin_left+margin,margin_top] + ")");
        var bubbleGroup2 = g.append("g")
                .attr("class", "bubbles")
                .attr("transform", 
                      "translate(" + [margin_right,margin_top] + ")");
        next_height_col2=height+margin_top;
   
        // Use the pack layout to initialize node positions:
        d3.layout.pack()
            .sort((
                sortOrder?
                    ( (sortOrder<0)? 
                        function(a,b){return b.size - a.size;} : //descending
                        function(a,b){return a.size - b.size;} ) : //ascending
                    function(a,b){return 0;} //no sort
                ))
            .value(function(d) { return d.size; })
            .nodes({children:data1});

        d3.layout.pack()
            .sort((
                sortOrder?
                    ( (sortOrder<0)? 
                        function(a,b){return b.size - a.size;} : 
                        function(a,b){return a.size - b.size;} ) : 
                    function(a,b){return 0;}
                ))
            .value(function(d) { return d.size; })
            .nodes({children:data2});
  
            //Create circles!//
        var bubbles = bubbleGroup.selectAll("circle")
            .data(data1)          
            .enter()
                .append("circle").attr('class','circle').on('mouseover', function(d){
            var nodeSelection = d3.select(this).style({stroke:color[d['type']],'stroke-width':'4'});}).on("mouseout", function(d){
            var nodeSelection = d3.select(this).style({stroke:'transparent','stroke-width':'10'});});
        var bubbles_label=bubbleGroup.selectAll("text")
            .data(data1)          
            .enter().append('text');

       var bubbles2 = bubbleGroup2.selectAll("circle")
            .data(data2)          
            .enter()
                .append("circle").attr('class','circle').on('mouseover', function(d){
            var nodeSelection = d3.select(this).style({stroke:color[d['type']],'stroke-width':'4'});}).on("mouseout", function(d){
            var nodeSelection = d3.select(this).style({stroke:'transparent','stroke-width':'10'});});
        var bubbles_label2=bubbleGroup2.selectAll("text")
            .data(data2)          
            .enter().append('text');
         
        setTimeout(function(){
            var sec1=0;var sec2=0;var sec3=0;
            var sec4=0;var sec5=0;var sec6=0;
            bubbles
                .attr("r", function(d,i){return np[sec1++].r;} )
                .attr("cx", function(d){return np[sec2++].x;})
                .attr("cy", function(d){return np[sec3++].y;})
                .attr('fill',function(d){return color[d['type']];});

            bubbles_label.attr("x", function(d){return np[sec4++].x;})
                .attr("y", function(d){return np[sec5++].y;})
                .text(function(d){return d.name})
                .style('font-size', function(d) {
                    if(d.name.length>7)
                        return  getFontSizeInPX(d.name.length,np[sec6++].r)+'px';
                    else
                        return(np[sec6++].r/2.5)+'px';
                })
                .style("text-anchor", "middle");
                },2200);

        setTimeout(function(){
            var sec1=0;var sec2=0;var sec3=0;
            var sec4=0;var sec5=0;var sec6=0;
            bubbles2
                .attr("r", function(d){return np2[sec1++].r} )
                .attr("cx", function(d){return np2[sec2++].x})
                .attr("cy", function(d){return np2[sec3++].y;})
                .attr('fill',function(d){return color[d['type']];});

            bubbles_label2.attr("x", function(d){return np2[sec4++].x;})
                .attr("y", function(d){return np2[sec5++].y;})
                .text(function(d){return d.name})
                .style('font-size', function(d) {
                    if(d.name.length>=6)
                        return  getFontSizeInPX(d.name.length, np2[sec6++].r)+'px';
                    else
                        return(np2[sec6++].r/2)+'px';
                })
                .style("text-anchor", "middle")
                },2200);

        return next_height_col2;

    }

     function indicator(divobj,thresh,used,total,x,label,pointerLabel,next_height_col2){

      var data = [0];
      var per=100-Math.round(used/total*100);
      for (var i = 1; i < 100; i++) {
        data.push(i);
      };

      var width = mainWidth*0.05;
      var margintop=next_height_col2+45;
      var margin_left=(mainWidth*0.575)+50+(x*mainWidth*0.112);
      var height = 2.8;
      var pathArrow='l 14.14 20 l -28.28 0 z';
      var diffFromLeftMargin = 70;
      if(mainWidth < 480)
        pathArrow='l 7.7 10 l -14.14 0 z';
      if(mainWidth < 290)
        diffFromLeftMargin = 60;
      var g=divobj.append('g');
      var group=g.append('g')
                      .attr("style", "outline: thin solid #B0ABAB;")
                      .attr('transform','translate('+margin_left+','+margintop+')');
      var barHeight=mainHeight*0.001;

      componentsHeights.progranulin = margintop + (barHeight*100);
      var chart=group.selectAll('rect')
                      .data(data)
                      .enter()
                      .append('rect')
                      .attr('width',width)
                      .attr('height',height)
                      .attr('x',function(d,i){return 5;})
                      .attr('y',function(d,i){return d*barHeight;})
                      .attr('fill',function(d,i){
                        if (i < per)
                          return '#77F877';
                        else 
                          return '#F95050';
                      }).on('click',zoomIndicators);;



        g.append('text')
                .attr('transform','translate('+(margin_left+(mainWidth*0.027))+','+(margintop-6)+')')
                .style('font-size',width/5+'px')
                .text(""+label)
                .style("text-anchor", "middle").attr('fill','#000');
        g.append('text')
                .attr('transform','translate('+(margin_left-diffFromLeftMargin)+','+((thresh*barHeight)+margintop+6)+')')
                .style('font-size','0.68em')
                .text(pointerLabel).attr('fill','#000');
        g.append('path')
                .attr('d', function(d) { 
                     var x = 0, y = 0;
                    return 'M ' + x +' '+ y + pathArrow;
                })
                .attr('transform','translate('+margin_left+','+((thresh*barHeight)+margintop)+') rotate(90)')
                .attr('fill','#5273EB').on('click', zoomIndicators);
  
      }

      function genomeSequencing(divobj,next_height_col2, color,data){
            data={CSF:[{label:"APP",info:"text",type:"Not tested"},{label:"PSEN1",info:"http://example.com ",type:"Negative"},{label:"PSEN2",info:"text http://example.com ",type:"Negative"},{label:"PSEN2",info:"text http://example.com ",type:"Negative"}]};
            
            var headerfontSizeInPX =(0.10)*(mainWidth*0.3/16)*5+'px';
            var radius=mainWidth*0.3/18;;
            var width=mainWidth*0.35;
            var extraWidth=0.01*width;
            width +=extraWidth;
            var height=radius*2.5;
            var cy=radius*1.55;
            var diffBetweenRectangles=0.01*mainHeight*2+0.1*height;

            var margin_top=next_height_col2+height+diffBetweenRectangles;
            var margin_left=mainWidth*0.525+50;
            next_height_col2 = margin_top+height;

            componentsHeights.genomeSequencing = margin_top+height;

            var radius_circle=mainWidth*0.3/14;
            g=divobj.append('g').attr('height',height)
                .attr('width',width).attr('id','genomeSequencingBox').on('click',zoomGenomeSequencing);
            g.append('text')
                .attr('transform','translate('+margin_left+','+(margin_top-6)+')')
                .style('font-size',headerfontSizeInPX)
                .style('font-weight','bold')
                .text(' Genome Sequencing :');
    
            g.append('rect')
                .attr('height',height)
                .attr('width',width).attr('fill','#E2EEFF')
                .attr('transform','translate('+margin_left+','+margin_top+')').attr('class','box');
            
            var section = g.append('g')
                             .attr('width',width)
                             .attr('transform','translate(0,'+margin_top+')');

            return next_height_col2;
         
        }

        function geneExpression(divobj,next_height_col2, color,data){
                     
            var headerfontSizeInPX =(0.10)*(mainWidth*0.3/16)*5+'px';
            var radius=mainWidth*0.3/18;;
            var width = parseFloat(mainWidth*0.35);
            var height=radius*2.5;;
            var cy=radius*1.55;
            var diffBetweenRectangles=0.01*mainHeight*2+0.1*height;
            var margin_top=next_height_col2+diffBetweenRectangles;
            var margin_left=mainWidth*0.525+50;
            next_height_col2 = height+margin_top;

            componentsHeights.geneExpression = margin_top+height;

            var radius_circle=mainWidth*0.3/14;
            var arrLength = data.length;
            var perRecWidth=width/arrLength;
            var extraWidth=0.01*width;
            var xAxisArray =new Array(arrLength);

            for(var temp=0;temp<arrLength;temp++)
            {
                if(temp==0)
                    xAxisArray[temp]=0;
                else
                    xAxisArray[temp]=xAxisArray[temp-1]+perRecWidth+(extraWidth/2);
            }

            g=divobj.append('g').attr('height',height)
                .attr('width',width).attr('id','geneExpressionBox').on('click',zoomGeneExpression);
            g.append('text')
                .attr('transform','translate('+margin_left+','+(margin_top-6)+')')
                .style('font-size',headerfontSizeInPX)
                .style('font-weight','bold')
                .text(' Gene Expression');
    
            g.append('rect')
                .attr('height',height).attr('fill','#E2EEFF')
                .attr('width',width+extraWidth)
                .attr('transform','translate('+margin_left+','+margin_top+')').attr('class','box');
            
            var section= g.append('g')
                             .attr('width',width)
                             .attr('transform','translate('+margin_left+','+margin_top+')');
            var colorS={'T':'#66E186','F':'#C6C6C3'};
            var image={'T':'image/tick.PNG','F':'image/arrow.PNG'};
            
            section.selectAll('rect')
                .data(data)
                .enter()
                .append('rect')
                .attr('height',(height*0.95))
                .attr('width',perRecWidth)
                .attr('x',function(d,i){ return xAxisArray[i];})
                .attr('y',2)
                .attr('fill',function(d){return colorS[d['status']];});
            section.selectAll('image')
                .data(data)
                .enter()
                .append('image')
                .attr('x',function(d,i){return xAxisArray[i];})
                .attr('y',(height*0.12))
                .attr('width', (height*0.76))
                .attr('height', (height*0.76))
                .attr("xlink:href",function(d){return image[d['status']];});
            section.selectAll('text')
                .data(data)
                .enter()
                .append('text')
                .attr('x',function(d,i){ return xAxisArray[i]+2*height*0.76;})
                .attr('y',(height*0.65))
                .style("text-anchor", "middle")
                .style('font-size',height/3+'px')
                .text(function(d){ return d.label;});

             return next_height_col2;
     
        }

        function csf(divobj,next_height_col2, color,data){
            
            var headerfontSizeInPX =(0.10)*(mainWidth*0.3/16)*5+'px';
            var radius=mainWidth*0.3/18;;
            var numberOfCircles=data.length;
            var width = (radius*2)*numberOfCircles+(radius*(numberOfCircles+2));
            var height=radius*2.5;;
            var cy=height/2;
            var diffBetweenRectangles=0.01*mainHeight*2+0.1*height;
            var margin_top=next_height_col2+diffBetweenRectangles;
            var margin_left=mainWidth*0.525+50;
            next_height_col2 = height+margin_top;

            componentsHeights.csf = margin_top+height;

            g=divobj.append('g').attr('height',height)
                .attr('width',width).attr('id','csfBox').on('click',zoomCsf);
            g.append('text')
                .attr('transform','translate('+margin_left+','+(margin_top-6)+')')
                .style('font-size',headerfontSizeInPX)
                .style('font-weight','bold')
                .text(' CSF ');
    
            g.append('rect')
                .attr('height',height)
                .attr('width',width).attr('fill','#E2EEFF')
                .attr('transform','translate('+margin_left+','+margin_top+')').attr('class','box');
            
            var section= g.append('g')
                             .attr('width',width)
                             .attr('transform','translate('+margin_left+','+margin_top+')');
           
           section.selectAll('circle')
                    .data(data)
                    .enter()
                    .append('circle')
                    .attr('cx',function(d,i){ return (i*radius*3.2)+radius+radius;})
                    .attr('cy',cy)
                    .attr('r',radius)
                    .attr('fill',function(d){return color[d['type']];});
        
            section.selectAll('text')
                    .data(data)
                    .enter()
                    .append('text')
                    .attr('x',function(d,i){ return (i*radius*3.2)+radius+radius;})
                    .attr('y',cy)
                    .style("text-anchor", "middle")
                    .style('font-size',radius/3+'px')
                    .text(function(d){ return getText(d.info);})

            return next_height_col2;
           
        }

        function ipsCells(divobj,next_height_col2, color,data){
                     
            var headerfontSizeInPX =(0.10)*(mainWidth*0.3/16)*5+'px';  
            var radius_circle=mainWidth*0.3/18;;
            var height=radius_circle*2.5;;
            var width = parseFloat(mainWidth*0.35);
            var cy=radius_circle*1.55;
            var diffBetweenRectangles=0.01*mainHeight*2+0.1*height;

            var margin_top=next_height_col2+diffBetweenRectangles;
            var margin_left=mainWidth*0.525+50;
            next_height_col2 = margin_top+height*1.5;

            componentsHeights.ipsCells = margin_top+height;

            var arrLength = data.length;
            var perRecWidth=width/arrLength;
            var extraWidth=0.01*width;
            var xAxisArray =new Array(arrLength);

            for(var temp=0;temp<arrLength;temp++)
            {
                if(temp==0)
                    xAxisArray[temp]=0;
                else
                    xAxisArray[temp]=xAxisArray[temp-1]+perRecWidth+(extraWidth/2);
            }
        g=divobj.append('g').attr('height',height)
                .attr('width',width).attr('id','ipsBox').on('click',zoomIpsCells);
            g.append('text')
                .attr('transform','translate('+margin_left+','+( margin_top-6)+')')
                .style('font-size',headerfontSizeInPX)
                .style('font-weight','bold')
                .text(' iPS cells');
    
            g.append('rect')
                .attr('height',height)
                .attr('width',width+extraWidth).attr('fill','#E2EEFF')
                .attr('transform','translate('+margin_left+','+ margin_top+')').attr('class','box');
            
            var section= g.append('g')
                             .attr('width',width)
                             .attr('transform','translate('+margin_left+','+ margin_top+')');
           
            var colorS={'T':'#66E186','F':'#C6C6C3'};
            var image={'T':'image/tick.PNG','F':'image/arrow.PNG'};
            section.selectAll('rect')
                .data(data)
                .enter()
                .append('rect')
                .attr('height',(height*0.95))
                .attr('width',perRecWidth)
                .attr('x',function(d,i){ return xAxisArray[i];})
                .attr('y',2)
                .attr('fill',function(d){return colorS[d['status']];});
            section.selectAll('image')
                .data(data)
                .enter()
                    .append('image')
                    .attr('x',function(d,i){ return xAxisArray[i];})
                    .attr('y',(height*0.12))
                    .attr('width', (height*0.72))
                   .attr('height', (height*0.76))
                   .attr("xlink:href",function(d){return image[d['status']];});
            section.selectAll('text')
                    .data(data)
                    .enter()
                    .append('text')
                    .attr('x',function(d,i){ return xAxisArray[i]+2.2*height*0.76;})
                    .attr('y',(height*0.65))
                    .style("text-anchor", "middle")
                    .style('font-size',function(d,i){ if(d.label.length > 12) return height/5+'px'; else return height/4+'px';})
                    .text(function(d){ return d.label;});

            return next_height_col2;
            
        }
var svg=""

//find the center
var svgGElement=$('#maincontainer');
// function zoomMendillian(d)
// {   
//     if(isMendilianZoomed===false){
//         d3.select("#dash")
//       .transition()
//       .duration(1000)
//       .attr("transform", "scale(2,2)translate(0" + mainHeight/32 +")");
//       isMendilianZoomed=true;
//     }else{
//          d3.select("#dash")
//       .transition()
//       .duration(1000)
//       .attr("transform", "scale(1)translate(0,0)").attr();
//       isMendilianZoomed=false;
//     }
    

// }
clickDisabled=false;
function zoomMendillian(d)
{   
    if(isMendilianZoomed===false && clickDisabled===false){
        clickDisabled=true;
        d3.select("#dash")
      .transition()
      .duration(1000)
      .attr("transform", "scale(2,2)translate(0" + mainHeight/32 +")");
      setTimeout(function(){clickDisabled=false;},1000);
      isMendilianZoomed=true;
    }else if(isMendilianZoomed===true && clickDisabled===false){
        clickDisabled=true;
         d3.select("#dash")
      .transition()
      .duration(1000)
      .attr("transform", "scale(1)translate(0,0)").attr();
      setTimeout(function(){clickDisabled=false;},1000);
      isMendilianZoomed=false;
    }
}
function zoomTargetResequencing(d)
{   
    if(isTargetResequencingZoomed ===false  && clickDisabled===false){
        clickDisabled=true;
    d3.select("#dash")
      .transition()
      .duration(1000)
      .attr("transform", "scale(1.8)translate(0" + mainHeight/-8 +")");
      setTimeout(function(){clickDisabled=false;},1000);
      isTargetResequencingZoomed=true;
  }else if(isTargetResequencingZoomed ===true  && clickDisabled===false){
    clickDisabled=true;
        d3.select("#dash")
      .transition()
      .duration(1000)
      .attr("transform", "scale(1)translate(0,0)").attr();
      setTimeout(function(){clickDisabled=false;},1000);
       isTargetResequencingZoomed=false;
    }

}
function zoomExomeSequencing(d)
{   
    if(isExomeSequencingZoomed===false && clickDisabled===false){
        clickDisabled=true;
        d3.select("#dash")
      .style("pointer-events", "auto")
      .transition()
      .duration(1000)
      .attr("transform", "scale(1.4)translate("+ mainWidth/15 + "," + mainHeight/-2.9 +")");
      setTimeout(function(){clickDisabled=false;},1000);
      isExomeSequencingZoomed=true;
    }else if(isExomeSequencingZoomed===true && clickDisabled===false){
        clickDisabled=true;
        d3.select("#dash")
      .style("pointer-events", "auto")
      .transition()
      .duration(1000)
      .attr("transform", "scale(1)translate(0,0)").attr();
      setTimeout(function(){clickDisabled=false;},1000);
       isExomeSequencingZoomed=false;
    }   

}

function zoomCsf(d)
{   
    if(isCsfZoomed===false && clickDisabled===false){
        clickDisabled=true;
        d3.select("#dash")
      .style("pointer-events", "auto")
      .transition()
      .duration(1000)
      .attr("transform", "scale(2,2)translate("+ mainWidth/-2.25 + "," + mainHeight/-1.84 +")");
      setTimeout(function(){clickDisabled=false;},1000);
      isCsfZoomed=true;
    }else if(isCsfZoomed===true && clickDisabled===false){
        clickDisabled=true;
        d3.select("#dash")
      .style("pointer-events", "auto")
      .transition()
      .duration(1000)
      .attr("transform", "scale(1)translate(0,0)");
      setTimeout(function(){clickDisabled=false;},1000);
       isCsfZoomed=false;
    }
}

function zoomIpsCells(d)
{   
    if(isIpsCellsZoomed===false && clickDisabled===false){
        clickDisabled=true;
        d3.select("#dash")
      .style("pointer-events", "auto")
      .transition()
      .duration(1000)
      .attr("transform", "scale(2,2)translate("+ mainWidth/-2.25 + "," + mainHeight/-1.43 +")");
      setTimeout(function(){clickDisabled=false;},1000);
      isIpsCellsZoomed=true;
    }else if(isIpsCellsZoomed===true && clickDisabled===false){
        clickDisabled=true;
        d3.select("#dash")
      .style("pointer-events", "auto")
      .transition()
      .duration(1000)
      .attr("transform", "scale(1)translate(0,0)").attr();
      setTimeout(function(){clickDisabled=false;},1000);
       isIpsCellsZoomed=false;
    }
}

function zoomGeneExpression(d)
{   
    if(isGeneExpressionZoomed===false && clickDisabled===false){
        clickDisabled=true;
        d3.select("#dash")
      .style("pointer-events", "auto")
      .transition()
      .duration(1000)
      .attr("transform", "scale(2,2)translate("+ mainWidth/-2.25 + "," + mainHeight/-2.29 +")");
      setTimeout(function(){clickDisabled=false;},1000);
      isGeneExpressionZoomed=true;
    }else if(isGeneExpressionZoomed===true && clickDisabled===false){
        clickDisabled=true;
    d3.select("#dash")
      .style("pointer-events", "auto")
      .transition()
      .duration(1000)
      .attr("transform", "scale(1)translate(0,0)").attr();
      setTimeout(function(){clickDisabled=false;},1000);
       isGeneExpressionZoomed=false;
    }
}

function zoomGenomeSequencing(d)
{   
    if(isGenomeSequencingZoomed===false && clickDisabled===false){
        clickDisabled=true;
        d3.select("#dash")
      .style("pointer-events", "auto")
      .transition()
      .duration(1000)
      .attr("transform", "scale(2,2)translate("+ mainWidth/-2.18 + "," + mainHeight/-3.38 +")");
      setTimeout(function(){clickDisabled=false;},1000);
      isGenomeSequencingZoomed=true;
    }else if(isGenomeSequencingZoomed===true && clickDisabled===false){
        clickDisabled=true;
        d3.select("#dash")
      .style("pointer-events", "auto")
      .transition()
      .duration(1000)
      .attr("transform", "scale(1)translate(0,0)").attr();
      setTimeout(function(){clickDisabled=false;},1000);
       isGenomeSequencingZoomed=false;
    }
}
function zoomGeneticRiskMap(d)
{   
    if(isGeneticRiskMapZoomed===false && clickDisabled===false){
        clickDisabled=true;
        d3.select("#dash")
      .style("pointer-events", "auto")
      .transition()
      .duration(1000)
      .attr("transform", "scale(2,2)translate("+ mainWidth/-2.01+ "," + mainHeight/12.84 +")");
      setTimeout(function(){clickDisabled=false;},1000);
      isGeneticRiskMapZoomed=true;
    }else if(isGeneticRiskMapZoomed===true && clickDisabled===false){
        clickDisabled=true;
        d3.select("#dash")
      .style("pointer-events", "auto")
      .transition()
      .duration(1000)
      .attr("transform", "scale(1)translate(0,0)").attr();
      setTimeout(function(){clickDisabled=false;},1000);
       isGeneticRiskMapZoomed=false;
    }
}

function zoomIndicators(d){
    if(isIndicatorsZoomed===false && clickDisabled===false){
        clickDisabled=true;
        d3.select("#dash")
      .style("pointer-events", "auto")
      .transition()
      .duration(1000)
      .attr("transform", "scale(2.2,3)translate("+ mainWidth/-2 + "," + mainHeight/-3.56 +")");
      setTimeout(function(){clickDisabled=false;},1000);
      isIndicatorsZoomed=true;
    }else if(isIndicatorsZoomed===true && clickDisabled===false){
        clickDisabled=true;
    d3.select("#dash")
      .style("pointer-events", "auto")
      .transition()
      .duration(1000)
      .attr("transform", "scale(1)translate(0,0)").attr();
      setTimeout(function(){clickDisabled=false;},1000);
       isIndicatorsZoomed=false;
    }
}