class AddGeolocalisationToUsers < ActiveRecord::Migration
  def self.up
    add_column :users, :address, :string
    add_column :users, :lat, :decimal,    :precision => 15, :scale => 10 
    add_column :users, :lng, :decimal,    :precision => 15, :scale => 10 
  end

  def self.down
    remove_column :users, :address
    remove_column :users, :lat
    remove_column :users, :lng
  end
end
