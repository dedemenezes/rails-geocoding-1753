class AddCoordinatesToFlats < ActiveRecord::Migration[7.2]
  def change
    add_column :flats, :latitude, :float
    add_column :flats, :longitude, :float
  end
end
