package lk.ijse.spring.repo;

import lk.ijse.spring.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

/**
 * @author : M-Prageeth
 * @created : 25/06/2022 - 9:19 AM
 **/
public interface ItemRepo extends JpaRepository<Item, String> {
    @Query(value = "SELECT code FROM Item ORDER BY code DESC LIMIT 1", nativeQuery = true)
    String findLastItem();
}
