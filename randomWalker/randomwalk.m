%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%  SPACE APPS CHALLENGE 
%%  SENSOR YOURSELF
%%% BROKEN JAW LABS
%%% SENSING WITH SENSOR SWARM 
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

clear
close all

N=30;
NT=100;
x=zeros(N,1);
y=zeros(N,1);
posx=zeros(N,NT);
posy=zeros(N,NT);
temp=zeros(N,1);
tempvec=zeros(N,NT);

D=10;
dt=1;
b = 100;

xmax=100; ymax=100;
nbin=210;
 
xsv(1)=x(1,1);
ysv(1)=y(1,1);

    %Temp distribution
    temp_eval = @(x1,x2) (x1.^2 + x2.^2 - 1.*cos(2.0*pi.*x1) - 1*cos(5.0.*pi*x2));
    
    %Real Temp Field
    i1 = 0:1:100;
    [x1m, x2m] = meshgrid(i1, i1);
    fm = temp_eval(x1m,x2m);
    figure(1);
    set(gcf,'units','normalized','outerposition',[0 0 1 1]);
    subplot(1,2,1)
    contour(x1m,x2m,fm);
    subplot(1,2,2)
    meshc(x1m,x2m,fm);
    colorbar;
    w = waitforbuttonpress;
    
for n=1:NT,
    x=x+randn(N,1)*(2*D*dt)^0.5;
    y=y+randn(N,1)*(2*D*dt)^0.5;
    for i=1:N,
        if y(i) < ymax;
            y(i) = abs(y(i));
        elseif y(i) > (-ymax);
            y(i) = 2*b - y(i);
        end
    end
    
    for i=1:N,
        if x(i) < xmax,
            x(i) = abs(x(i));
        elseif x(i) > (-xmax);
            x(i) = 2*b - x(i);
        end
    end
    
    for i=2:N,
        if y(i)==y(i-1),
            y(i)=b + y(i);
        end
    end
    
    xsv(n+1)=x(1,1);
    ysv(n+1)=y(1,1);
    
    %Store a position
    posx(:,n) = x;
    posy(:,n) = y;
    %Sensing the whole values
    temp = temp_eval(x,y);
    tempvec(:,n) = temp; 
    %Sensing the values for the sample bot
    tempsv(n+1) = temp_eval(x(1,1),y(1,1));
    figure(2);
    set(gcf,'units','normalized','outerposition',[0 0 1 1]);
    subplot(1,2,1)
    plot(x,y,'ko',xsv,ysv,'r-o');
    axis([0 xmax 0 ymax]);
    xlabel('x'); ylabel('y'); title('Swarm Sensor Position');
    subplot(1,2,2)
    plot(tempsv,'r-.');
   
    pause(0.05)
end
w = waitforbuttonpress;
%Map reconstruction
%Reconstructing the data vectors
for r=1:NT-1,

posxq = posx(:);
posyq = posy(:);
tempvecq = tempvec(:);
end
%Interpolar para reconstruir...
F = TriScatteredInterp(posxq,posyq,tempvecq)
[nfcx,nfcy] = meshgrid(i1,i1);
nfcz = F(nfcx,nfcy);
figure(3)
set(gcf,'units','normalized','outerposition',[0 0 1 1]);
meshc(nfcx,nfcy,nfcz);
colorbar;
hold on;
plot3(posxq,posyq,tempvecq,'.');
hold off;
w = waitforbuttonpress;
%Safe Path Planning
x_path = [2      20     33      46      54     63       69      80      85      93];
y_path = [86     89     91      87      76      77      63      53      32      19];
figure(4);
set(gcf,'units','normalized','outerposition',[0 0 1 1]);
contour(nfcz);
hold on;
plot(x_path,y_path,'b--','LineWidth',0.5);
for q=1:numel(x_path)-1,
    
    plot(x_path(q),y_path(q),x_path(q+1),y_path(q+1),'b-o','LineWidth',2);

pause(1);
end
hold off;



    


