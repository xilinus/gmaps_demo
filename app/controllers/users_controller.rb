class UsersController < ApplicationController
  # Be sure to include AuthenticationSystem in Application Controller instead
  include AuthenticatedSystem
  before_filter :find_user, :only => [:edit, :update]

  def index
    @users = User.find :all
    render :layout => 'map'
  end

  # render new.rhtml
  def new
    @user = User.new
  end

  def create
    cookies.delete :auth_token
    # protects against session fixation attacks, wreaks havoc with 
    # request forgery protection.
    # uncomment at your own risk
    # reset_session
    @user = User.new(params[:user])
    @user.save
    if @user.errors.empty?
      self.current_user = @user
      redirect_back_or_default('/')
      flash[:notice] = "Thanks for signing up!"
    else
      render :action => 'new'
    end
  end
  
  def edit
  end
  
  def update
    if @user.update_attributes params[:user]
      redirect_to users_url
    else
      render :action => 'edit'
    end
  end
  
  def map
    @users = User.find :all
    render :layout => 'map'
  end
  
private
  def find_user
    @user = User.find params[:id]
  end
end
