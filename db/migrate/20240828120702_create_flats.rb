class CreateFlats < ActiveRecord::Migration[7.2]
  def change
    create_table :flats do |t|
      t.string :name
      t.string :address

      t.timestamps
    end
  end
end